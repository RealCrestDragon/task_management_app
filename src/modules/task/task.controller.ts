import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { User } from 'src/common/decorators/user.decorator';
import type { PublicUser } from 'src/common/types/user.type';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { QueryTaskDto } from './dto/queryTask.dto';
import { AssignTaskDto } from './dto/assignTask.dto';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto';
import { Task, TaskAssignment } from 'generated/prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Query() query: QueryTaskDto): Promise<Task[]> {
    return this.taskService.getTasks(query);
  }

  @Get(':id')
  async getDetailTask(@Param('id') id: number): Promise<Task | null> {
    return this.taskService.getDetailTask(id);
  }

  @Post()
  async createTask(
    @User() user: PublicUser,
    @Body() payload: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(user, payload);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() payload: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, payload);
  }

  @Post(':id/assign')
  async assignTask(
    @Param('id') id: number,
    @User() user: PublicUser,
    @Body() payload: AssignTaskDto,
  ): Promise<TaskAssignment[]> {
    return this.taskService.assignTask(id, user, payload);
  }

  @Patch(':id/pin')
  async pinTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.pinTask(id);
  }

  @Patch(':id/update-status')
  async updateStatus(
    @Param('id') id: number,
    @Body() payload: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateStatus(id, payload);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
