import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationProducer } from './notification.producer';
import { NotificationConsumer } from './notification.consumer';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
    GatewayModule,
  ],
  providers: [NotificationProducer, NotificationConsumer],
  exports: [NotificationProducer],
})
export class QueueModule {}
