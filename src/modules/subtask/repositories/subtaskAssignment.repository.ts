import { Injectable } from '@nestjs/common';
import { SubtaskAssignment } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface AssignSubtaskPayload {
  subtaskId: number;
  assignedById: number;
  assignedToId: number;
  role?: string | undefined;
}

@Injectable()
export class SubtaskAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async assignSubtask(
    subtaskId: number,
    assignedById: number,
    payload: AssignSubtaskPayload[],
  ): Promise<SubtaskAssignment[]> {
    await this.prisma.$transaction(async (tx) => {
      const existingSubtaskAssignments = await tx.subtaskAssignment.findMany({
        where: { subtaskId },
      });

      const payloadAssignedToId: number[] = [];
      const toAdd: AssignSubtaskPayload[] = [];
      const toUpdate: { id: number; data: AssignSubtaskPayload }[] = [];

      payload.forEach((item) => {
        const newPayload = {
          ...item,
          subtaskId,
          assignedById,
        };
        payloadAssignedToId.push(item.assignedToId);
        const duplicate = existingSubtaskAssignments.find(
          ({ assignedToId }) => assignedToId === item.assignedToId,
        );
        if (!duplicate) toAdd.push(newPayload);
        else if (item.role && item.role !== duplicate.role)
          toUpdate.push({ id: duplicate.id, data: newPayload });
      });

      const toDeleteAssignedToIds = existingSubtaskAssignments
        .map((item) => item.assignedToId)
        .filter((id) => !payloadAssignedToId.includes(id));

      return Promise.all([
        tx.subtaskAssignment.createMany({
          data: toAdd,
        }),
        tx.subtaskAssignment.deleteMany({
          where: {
            assignedToId: { in: toDeleteAssignedToIds },
          },
        }),
        ...toUpdate.map((item) => {
          return tx.subtaskAssignment.update({
            where: { id: item.id },
            data: item.data,
          });
        }),
      ]);
    });
    return this.prisma.subtaskAssignment.findMany({
      where: { subtaskId },
    });
  }
}
