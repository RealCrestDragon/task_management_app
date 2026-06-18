import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [JobService],
})
export class JobModule {}
