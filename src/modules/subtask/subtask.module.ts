import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { SubtaskRepository } from './repositories/subtask.repository';
import { SubtaskAssignmentRepository } from './repositories/subtaskAssignment.repository';
import { TaskModule } from '../task/task.module';
import { QueueModule } from 'src/common/queue/queue.module';

@Module({
  imports: [TaskModule, QueueModule],
  controllers: [SubtaskController],
  providers: [SubtaskService, SubtaskRepository, SubtaskAssignmentRepository],
})
export class SubtaskModule {}
