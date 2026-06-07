import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { QueryTaskDto } from '../dto/queryTask.dto';
import { TaskStatus } from 'generated/prisma/enums';
import { Injectable } from '@nestjs/common';
import { Task } from 'generated/prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  findTasks(query: QueryTaskDto): Promise<Task[]> {
    const {
      name,
      dueDateFrom,
      dueDateTo,
      authorId,
      isPinned,
      status,
      assignedByIds,
      assignedToIds,
      page,
      limit,
      orderBy,
      orderDirection,
    } = query;
    return this.prisma.task.findMany({
      where: {
        ...(name && { name }),
        ...(authorId && { authorId }),
        ...(isPinned && { isPinned }),
        ...(status && { status }),
        ...(dueDateFrom && { dueDate: { gte: dueDateFrom } }),
        ...(dueDateTo && { dueDate: { lte: dueDateTo } }),
        ...(assignedByIds?.length && {
          taskAssignments: {
            some: {
              assignedById: { in: assignedByIds },
            },
          },
        }),
        ...(assignedToIds?.length && {
          taskAssignments: {
            some: {
              assignedToId: { in: assignedToIds },
            },
          },
        }),
      },
      orderBy: { ...(orderBy && { [orderBy]: orderDirection ?? 'asc' }) },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  findDetailById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        subtasks: true,
        taskAssignments: true,
      },
    });
  }

  createTask(authorId: number, payload: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data: { ...payload, authorId } });
  }

  updateTask(id: number, payload: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: payload });
  }

  pinTask(id: number): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: { isPinned: true } });
  }

  updateStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: { status } });
  }

  deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
