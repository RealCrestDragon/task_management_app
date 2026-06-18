import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { UpdateTagDto } from './dto/updateTag.dto';
import { CreateTagDto } from './dto/createTag.dto';
import { Tag } from 'generated/prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('tags')
@ApiBearerAuth()
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tags' })
  @ApiResponse({ status: 200, description: 'Tag list' })
  async getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tag detail' })
  @ApiResponse({ status: 200, description: 'Tag detail' })
  async getTag(@Param('id') id: number): Promise<Tag | null> {
    return this.tagService.getTag(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create tag' })
  @ApiResponse({ status: 201, description: 'Tag created' })
  async createTags(@Body() payload: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tag' })
  @ApiResponse({ status: 200, description: 'Tag updated' })
  async updateTag(
    @Param('id') id: number,
    @Body() payload: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagService.updateTag(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tag' })
  @ApiResponse({ status: 200, description: 'Tag deleted' })
  async deleteTag(@Param('id') id: number): Promise<Tag> {
    return this.tagService.deleteTag(id);
  }
}
