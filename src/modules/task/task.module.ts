import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './repositories/task.repository';
import { TaskAssignmentRepository } from './repositories/taskAssignment.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, TaskAssignmentRepository],
})
export class TaskModule {}
