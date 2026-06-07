import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './repositories/notification.repository';
import { Notification } from 'generated/prisma/client';
import { PublicUser } from 'src/common/types/user.type';
import { QueryNotificationDto } from './dto/queryNotification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(
    user: PublicUser,
    query: QueryNotificationDto,
  ): Promise<Notification[]> {
    return this.notificationRepository.getNotifications(user.id, query);
  }

  async getNotification(id: number): Promise<Notification | null> {
    return this.notificationRepository.getNotificationById(id);
  }

  async readNotification(id: number): Promise<Notification> {
    return this.notificationRepository.readNotification(id);
  }
}
