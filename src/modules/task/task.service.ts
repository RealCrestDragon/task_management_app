import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskRepository } from './repositories/task.repository';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { PublicUser } from 'src/common/types/user.type';
import { QueryTaskDto } from './dto/queryTask.dto';
import { AssignTaskDto } from './dto/assignTask.dto';
import { TaskAssignmentRepository } from './repositories/taskAssignment.repository';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto';
import { validTransitions } from 'src/constants/status.constant';
import { Task, TaskAssignment, TaskStatus } from 'generated/prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskAssignmentRepository: TaskAssignmentRepository,
  ) {}

  async getTasks(query: QueryTaskDto): Promise<Task[]> {
    return this.taskRepository.findTasks(query);
  }

  async getDetailTask(id: number): Promise<Task | null> {
    return this.taskRepository.findDetailById(id);
  }

  async createTask(user: PublicUser, payload: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(user.id, payload);
  }

  async updateTask(id: number, payload: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.updateTask(id, payload);
  }

  async pinTask(id: number): Promise<Task> {
    return this.taskRepository.pinTask(id);
  }

  async assignTask(
    id: number,
    user: PublicUser,
    payload: AssignTaskDto,
  ): Promise<TaskAssignment[]> {
    const assignTaskPayload = payload.assignTasks.map((item) => ({
      ...item,
      taskId: id,
      assignedById: user.id,
    }));
    return this.taskAssignmentRepository.assignTask(
      id,
      user.id,
      assignTaskPayload,
    );
  }

  async updateStatus(id: number, payload: UpdateTaskStatusDto): Promise<Task> {
    const { status } = payload;
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    const { subtasks } = task;
    if (!validTransitions[task.status].includes(status)) {
      throw new ConflictException('Invalid status');
    }
    if (
      status === TaskStatus.COMPLETED &&
      subtasks.length &&
      subtasks.some(({ status }) => status === TaskStatus.ACTIVE)
    ) {
      throw new ConflictException('There are unfinished subtask(s)');
    }
    return this.taskRepository.updateStatus(id, status);
  }

  async deleteTask(id: number) {
    return this.taskRepository.deleteTask(id);
  }
}
