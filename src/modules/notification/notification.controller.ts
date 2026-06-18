import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from 'generated/prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import type { PublicUser } from 'src/common/types/user.type';
import { QueryNotificationDto } from './dto/queryNotification.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of notifications' })
  @ApiResponse({ status: 200, description: 'Notification list' })
  async getNotifications(
    @User() user: PublicUser,
    @Query() query: QueryNotificationDto,
  ): Promise<Notification[]> {
    return this.notificationService.getNotifications(user, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification detail' })
  @ApiResponse({ status: 200, description: 'Notification detail' })
  async getNotification(@Param('id') id: number): Promise<Notification | null> {
    return this.notificationService.getNotification(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200, description: 'Notification read' })
  async readNotification(
    @Param('id') id: number,
  ): Promise<Notification | null> {
    return this.notificationService.readNotification(id);
  }
}
