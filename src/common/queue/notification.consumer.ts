import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppGateway } from '../gateway/app.gateway';
import { NotificationPayload } from '../types/notification.type';

@Processor('notification')
export class NotificationConsumer extends WorkerHost {
  constructor(
    private prisma: PrismaService,
    private appGateway: AppGateway,
  ) {
    super();
  }

  async process(job: Job<NotificationPayload, any, string>): Promise<any> {
    const { userId, title, content } = job.data;
    await this.prisma.notification.create({ data: job.data });
    this.appGateway.pushNotification(userId, { title, content });
    return {};
  }
}
