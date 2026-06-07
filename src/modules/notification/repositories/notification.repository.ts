import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Notification } from 'generated/prisma/client';
import { QueryNotificationDto } from '../dto/queryNotification.dto';

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async getNotifications(
    userId: number,
    query: QueryNotificationDto,
  ): Promise<Notification[]> {
    const { type, limit, page } = query;
    return this.prisma.notification.findMany({
      where: { userId, ...(type && { type }) },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getNotificationById(id: number): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async readNotification(id: number): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
