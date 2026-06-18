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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tasks' })
  @ApiResponse({ status: 200, description: 'Task list' })
  async getTasks(@Query() query: QueryTaskDto): Promise<Task[]> {
    return this.taskService.getTasks(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task detail' })
  @ApiResponse({ status: 200, description: 'Task detail' })
  async getDetailTask(@Param('id') id: number): Promise<Task | null> {
    return this.taskService.getDetailTask(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, description: 'Task created' })
  async createTask(
    @User() user: PublicUser,
    @Body() payload: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(user, payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  async updateTask(
    @Param('id') id: number,
    @Body() payload: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, payload);
  }

  @Post(':id/assign')
  @ApiOperation({ summary: 'Assign task for user(s)' })
  @ApiResponse({ status: 200, description: 'Task assigned' })
  async assignTask(
    @Param('id') id: number,
    @User() user: PublicUser,
    @Body() payload: AssignTaskDto,
  ): Promise<TaskAssignment[]> {
    return this.taskService.assignTask(id, user, payload);
  }

  @Patch(':id/pin')
  @ApiOperation({ summary: 'Pin a task' })
  @ApiResponse({ status: 200, description: 'Task pinned' })
  async pinTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.pinTask(id);
  }

  @Patch(':id/update-status')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'Task status updated' })
  async updateStatus(
    @Param('id') id: number,
    @Body() payload: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateStatus(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  async deleteTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
