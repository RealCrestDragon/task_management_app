import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubtaskDto } from './dto/createSubtask.dto';
import { SubtaskRepository } from './repositories/subtask.repository';
import { UpdateSubtaskDto } from './dto/updateSubtask.dto';
import { PublicUser } from 'src/common/types/user.type';
import { QuerySubtaskDto } from './dto/querySubtask.dto';
import { AssignSubtaskDto } from './dto/assignSubtask.dto';
import { SubtaskAssignmentRepository } from './repositories/subtaskAssignment.repository';
import { UpdateSubtaskStatusDto } from './dto/updateSubtaskStatus.dto';
import { validTransitions } from 'src/constants/status.constant';
import {
  NotificationType,
  Subtask,
  SubtaskAssignment,
} from 'generated/prisma/client';
import { TaskRepository } from '../task/repositories/task.repository';
import { NotificationProducer } from 'src/common/queue/notification.producer';
import { NOTIFICATION_CONTENT } from 'src/constants/notification.constant';

@Injectable()
export class SubtaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly subtaskRepository: SubtaskRepository,
    private readonly subtaskAssignmentRepository: SubtaskAssignmentRepository,
    private readonly notificationProducer: NotificationProducer,
  ) {}

  async getSubtasks(
    taskId: number,
    query: QuerySubtaskDto,
  ): Promise<Subtask[]> {
    return this.subtaskRepository.findSubtasks(taskId, query);
  }

  async getDetailSubtask(taskId: number, id: number): Promise<Subtask | null> {
    return this.subtaskRepository.findDetailById(id);
  }

  async createSubtask(
    taskId: number,
    user: PublicUser,
    payload: CreateSubtaskDto,
  ): Promise<Subtask> {
    await this._checkDueDate(taskId, payload);
    return this.subtaskRepository.createSubtask(taskId, user.id, payload);
  }

  async updateSubtask(
    taskId: number,
    id: number,
    payload: UpdateSubtaskDto,
  ): Promise<Subtask> {
    await this._checkDueDate(taskId, payload);
    return this.subtaskRepository.updateSubtask(taskId, id, payload);
  }

  async assignSubtask(
    id: number,
    user: PublicUser,
    payload: AssignSubtaskDto,
  ): Promise<SubtaskAssignment[]> {
    const assignSubtaskPayload = payload.assignSubtasks.map((item) => ({
      ...item,
      subtaskId: id,
      assignedById: user.id,
    }));
    const result = this.subtaskAssignmentRepository.assignSubtask(
      id,
      user.id,
      assignSubtaskPayload,
    );

    const type = NotificationType.SUBTASK_ASSIGNED;
    const { title, content } = NOTIFICATION_CONTENT[type];

    void Promise.all(
      payload.assignSubtasks.map(({ assignedToId }) => {
        return this.notificationProducer
          .pushNotification({
            userId: assignedToId,
            subtaskId: id,
            title,
            content,
            type,
          })
          .catch((error) => {
            console.log(
              error,
              `Push notification failed for user ${assignedToId} `,
            );
          });
      }),
    );

    return result;
  }

  async updateStatus(
    id: number,
    payload: UpdateSubtaskStatusDto,
  ): Promise<Subtask> {
    const { status } = payload;
    const subtask = await this.subtaskRepository.findById(id);
    if (!subtask) throw new NotFoundException('Subtask not found');
    if (!validTransitions[subtask.status].includes(status)) {
      throw new ConflictException("Can't update status");
    }
    return this.subtaskRepository.updateStatus(id, status);
  }

  async deleteSubtask(id: number) {
    return this.subtaskRepository.deleteSubtask(id);
  }

  private async _checkDueDate(taskId: number, payload: UpdateSubtaskDto) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');
    if (payload.dueDate && task.dueDate && payload.dueDate > task.dueDate)
      throw new BadRequestException(
        'Subtask due date has to be sooner than task due date',
      );
  }
}
