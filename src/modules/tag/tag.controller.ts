import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';
import { UpdateTagDto } from './dto/updateTag.dto';
import { CreateTagDto } from './dto/createTag.dto';
import { Tag } from 'generated/prisma/client';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @Post()
  async createTags(@Body() payload: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(payload);
  }

  @Get(':id')
  async getTag(@Param('id') id: number): Promise<Tag | null> {
    return this.tagService.getTag(id);
  }

  @Put(':id')
  async updateTag(
    @Param('id') id: number,
    @Body() payload: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagService.updateTag(id, payload);
  }
}
