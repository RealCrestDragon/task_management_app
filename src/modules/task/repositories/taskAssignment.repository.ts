import { Injectable } from '@nestjs/common';
import { TaskAssignment } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface AssignTaskPayload {
  taskId: number;
  assignedById: number;
  assignedToId: number;
  role?: string | undefined;
}

@Injectable()
export class TaskAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async assignTask(
    taskId: number,
    assignedById: number,
    payload: AssignTaskPayload[],
  ): Promise<TaskAssignment[]> {
    await this.prisma.$transaction(async (tx) => {
      const existingTaskAssignments = await tx.taskAssignment.findMany({
        where: { taskId },
      });

      const payloadAssignedToId: number[] = [];
      const toAdd: AssignTaskPayload[] = [];
      const toUpdate: { id: number; data: AssignTaskPayload }[] = [];

      payload.forEach((item) => {
        const newPayload = {
          ...item,
          taskId,
          assignedById,
        };
        payloadAssignedToId.push(item.assignedToId);
        const duplicate = existingTaskAssignments.find(
          ({ assignedToId }) => assignedToId === item.assignedToId,
        );
        if (!duplicate) toAdd.push(newPayload);
        else if (item.role && item.role !== duplicate.role)
          toUpdate.push({ id: duplicate.id, data: newPayload });
      });

      const toDeleteAssignedToIds = existingTaskAssignments
        .map((item) => item.assignedToId)
        .filter((id) => !payloadAssignedToId.includes(id));

      return Promise.all([
        tx.taskAssignment.createMany({
          data: toAdd,
        }),
        tx.taskAssignment.deleteMany({
          where: {
            assignedToId: { in: toDeleteAssignedToIds },
          },
        }),
        ...toUpdate.map((item) => {
          return tx.taskAssignment.update({
            where: { id: item.id },
            data: item.data,
          });
        }),
      ]);
    });
    return this.prisma.taskAssignment.findMany({
      where: { taskId },
    });
  }
}
