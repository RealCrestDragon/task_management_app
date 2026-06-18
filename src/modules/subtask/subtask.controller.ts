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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('subtasks')
@ApiBearerAuth()
@Controller('task/:taskId/subtasks')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of subtasks' })
  @ApiResponse({ status: 200, description: 'Subtask list' })
  async getSubtasks(
    @Param('taskId') taskId: number,
    @Query() query: QuerySubtaskDto,
  ): Promise<Subtask[]> {
    return this.subtaskService.getSubtasks(taskId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subtask detail' })
  @ApiResponse({ status: 200, description: 'Subtask detail' })
  async getDetailSubtask(
    @Param('taskId') taskId: number,
    @Param('id') id: number,
  ): Promise<Subtask | null> {
    return this.subtaskService.getDetailSubtask(taskId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create subtask' })
  @ApiResponse({ status: 200, description: 'Subtask created' })
  async createSubtask(
    @Param('taskId') taskId: number,
    @User() user: PublicUser,
    @Body() payload: CreateSubtaskDto,
  ): Promise<Subtask> {
    return this.subtaskService.createSubtask(taskId, user, payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update subtask' })
  @ApiResponse({ status: 200, description: 'Subtask updated' })
  async updateSubtask(
    @Param('taskId') taskId: number,
    @Param('id') id: number,
    @Body() payload: UpdateSubtaskDto,
  ): Promise<Subtask> {
    return this.subtaskService.updateSubtask(taskId, id, payload);
  }

  @Post(':id/assign')
  @ApiOperation({ summary: 'Assign subtask for user(s)' })
  @ApiResponse({ status: 200, description: 'Subtask assigned' })
  async assignSubtask(
    @Param('taskId') taskId: number,
    @Param('id') id: number,
    @User() user: PublicUser,
    @Body() payload: AssignSubtaskDto,
  ): Promise<SubtaskAssignment[]> {
    return this.subtaskService.assignSubtask(id, user, payload);
  }

  @Patch(':id/update-status')
  @ApiOperation({ summary: 'Update subtask status' })
  @ApiResponse({ status: 200, description: 'Subtask status updated' })
  async updateStatus(
    @Param('id') id: number,
    @Body() payload: UpdateSubtaskStatusDto,
  ): Promise<Subtask> {
    return this.subtaskService.updateStatus(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subtask' })
  @ApiResponse({ status: 200, description: 'Subtask deleted' })
  async deleteSubtask(@Param('id') id: number): Promise<Subtask> {
    return this.subtaskService.deleteSubtask(id);
  }
}
