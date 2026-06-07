import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { NotificationPayload } from '../types/notification.type';

@Injectable()
export class NotificationProducer {
  constructor(@InjectQueue('notification') private notificationQueue: Queue) {}

  async pushNotification(data: NotificationPayload): Promise<Job> {
    return this.notificationQueue.add('pushNotification', data);
  }
}
