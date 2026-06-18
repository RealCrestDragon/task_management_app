import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationProducer } from '../queue/notification.producer';
import { NOTIFICATION_CONTENT } from 'src/constants/notification.constant';
import { NotificationType } from 'generated/prisma/enums';

@Injectable()
export class JobService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationProducer: NotificationProducer,
  ) {}

  @Cron('0 * * * *')
  async pushNotification() {
    const now = new Date();
    const startTime = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const query = {
      AND: [{ dueDate: { gte: startTime } }, { dueDate: { lte: endTime } }],
    };
    const taskType = NotificationType.TASK_REMINDER;
    const subtaskType = NotificationType.SUBTASK_REMINDER;
    const { title: taskTitle, content: taskContent } =
      NOTIFICATION_CONTENT[taskType];
    const { title: subtaskTitle, content: subtaskContent } =
      NOTIFICATION_CONTENT[subtaskType];

    const numberOfDueTasks = await this.prisma.task.count({
      where: query,
    });
    const numberOfDueSubtasks = await this.prisma.subtask.count({
      where: query,
    });
    const limit = 20;
    for (let i = 0; i < numberOfDueTasks; i += limit) {
      const dueTasks = await this.prisma.taskAssignment.findMany({
        where: {
          task: query,
        },
        skip: i,
        take: limit,
      });
      await Promise.all(
        dueTasks.map(({ assignedToId, taskId }) => {
          return this.notificationProducer
            .pushNotification({
              userId: assignedToId,
              taskId,
              title: taskTitle,
              content: taskContent,
              type: taskType,
            })
            .catch((error) => {
              console.log(
                error,
                `Push notification failed for user ${assignedToId} `,
              );
            });
        }),
      );
    }
    for (let i = 0; i < numberOfDueSubtasks; i += limit) {
      const dueSubtasks = await this.prisma.subtaskAssignment.findMany({
        where: {
          subtask: query,
        },
        skip: i,
        take: limit,
      });
      await Promise.all(
        dueSubtasks.map(({ assignedToId, subtaskId }) => {
          return this.notificationProducer
            .pushNotification({
              userId: assignedToId,
              subtaskId,
              title: subtaskTitle,
              content: subtaskContent,
              type: subtaskType,
            })
            .catch((error) => {
              console.log(
                error,
                `Push notification failed for user ${assignedToId} `,
              );
            });
        }),
      );
    }
  }
}
