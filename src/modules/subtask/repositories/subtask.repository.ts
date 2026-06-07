import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubtaskDto } from '../dto/createSubtask.dto';
import { UpdateSubtaskDto } from '../dto/updateSubtask.dto';
import { QuerySubtaskDto } from '../dto/querySubtask.dto';
import { TaskStatus } from 'generated/prisma/enums';
import { Injectable } from '@nestjs/common';
import { Subtask } from 'generated/prisma/client';

@Injectable()
export class SubtaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  findSubtasks(taskId: number, query: QuerySubtaskDto): Promise<Subtask[]> {
    const { page, limit } = query;
    return this.prisma.subtask.findMany({
      where: { taskId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findById(id: number): Promise<Subtask | null> {
    return this.prisma.subtask.findUnique({ where: { id } });
  }

  findDetailById(id: number): Promise<Subtask | null> {
    return this.prisma.subtask.findUnique({
      where: { id },
      include: {
        subtaskAssignments: true,
      },
    });
  }

  createSubtask(
    taskId: number,
    authorId: number,
    payload: CreateSubtaskDto,
  ): Promise<Subtask> {
    return this.prisma.subtask.create({
      data: { ...payload, taskId, authorId },
    });
  }

  updateSubtask(
    taskId: number,
    id: number,
    payload: UpdateSubtaskDto,
  ): Promise<Subtask> {
    return this.prisma.subtask.update({
      where: { id },
      data: { ...payload, taskId },
    });
  }

  updateStatus(id: number, status: TaskStatus): Promise<Subtask> {
    return this.prisma.subtask.update({ where: { id }, data: { status } });
  }

  deleteSubtask(id: number): Promise<Subtask> {
    return this.prisma.subtask.delete({ where: { id } });
  }
}
