import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './repositories/task.repository';
import { TaskAssignmentRepository } from './repositories/taskAssignment.repository';
import { QueueModule } from 'src/common/queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, TaskAssignmentRepository],
  exports: [TaskRepository],
})
export class TaskModule {}
