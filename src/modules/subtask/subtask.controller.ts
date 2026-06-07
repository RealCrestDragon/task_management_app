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
import { SubtaskService } from './subtask.service';
import { CreateSubtaskDto } from './dto/createSubtask.dto';
import { User } from 'src/common/decorators/user.decorator';
import type { PublicUser } from 'src/common/types/user.type';
import { UpdateSubtaskDto } from './dto/updateSubtask.dto';
import { QuerySubtaskDto } from './dto/querySubtask.dto';
import { AssignSubtaskDto } from './dto/assignSubtask.dto';
import { UpdateSubtaskStatusDto } from './dto/updateSubtaskStatus.dto';
import { Subtask, SubtaskAssignment } from 'generated/prisma/client';

@Controller('task/:taskId/subtask')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Get()
  async getSubtasks(
    @Param('taskId') taskId: number,
    @Query() query: QuerySubtaskDto,
  ): Promise<Subtask[]> {
    return this.subtaskService.getSubtasks(taskId, query);
  }

  @Get(':id')
  async getDetailSubtask(
    @Param('taskId') taskId: number,
    @Param('id') id: number,
  ): Promise<Subtask | null> {
    return this.subtaskService.getDetailSubtask(taskId, id);
  }

  @Post()
  async createSubtask(
    @Param('taskId') taskId: number,
    @User() user: PublicUser,
    @Body() payload: CreateSubtaskDto,
  ): Promise<Subtask> {
    return this.subtaskService.createSubtask(taskId, user, payload);
  }

  @Put(':id')
  async updateSubtask(
    @Param('taskId') taskId: number,
    @Param('id') id: number,
    @Body() payload: UpdateSubtaskDto,
  ): Promise<Subtask> {
    return this.subtaskService.updateSubtask(taskId, id, payload);
  }

  @Post(':id/assign')
  async assignSubtask(
    @Param('taskId') taskId: number,
    @Param('id') id: number,
    @User() user: PublicUser,
    @Body() payload: AssignSubtaskDto,
  ): Promise<SubtaskAssignment[]> {
    return this.subtaskService.assignSubtask(id, user, payload);
  }

  @Patch(':id/update-status')
  async updateStatus(
    @Param('id') id: number,
    @Body() payload: UpdateSubtaskStatusDto,
  ): Promise<Subtask> {
    return this.subtaskService.updateStatus(id, payload);
  }

  @Delete(':id')
  async deleteSubtask(@Param('id') id: number): Promise<Subtask> {
    return this.subtaskService.deleteSubtask(id);
  }
}
