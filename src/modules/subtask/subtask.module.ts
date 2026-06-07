import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { SubtaskRepository } from './repositories/subtask.repository';
import { SubtaskAssignmentRepository } from './repositories/subtaskAssignment.repository';

@Module({
  controllers: [SubtaskController],
  providers: [SubtaskService, SubtaskRepository, SubtaskAssignmentRepository],
})
export class SubtaskModule {}
