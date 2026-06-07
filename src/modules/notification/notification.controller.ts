import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from 'generated/prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import type { PublicUser } from 'src/common/types/user.type';
import { QueryNotificationDto } from './dto/queryNotification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(
    @User() user: PublicUser,
    @Query() query: QueryNotificationDto,
  ): Promise<Notification[]> {
    return this.notificationService.getNotifications(user, query);
  }

  @Get(':id')
  async getNotification(@Param('id') id: number): Promise<Notification | null> {
    return this.notificationService.getNotification(id);
  }

  @Patch(':id')
  async readNotification(
    @Param('id') id: number,
  ): Promise<Notification | null> {
    return this.notificationService.readNotification(id);
  }
}
