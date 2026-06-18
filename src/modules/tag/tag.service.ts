import { Injectable } from '@nestjs/common';
import { TagRepository } from './repositories/tag.repository';
import { UpdateTagDto } from './dto/updateTag.dto';
import { Tag } from 'generated/prisma/client';
import { CreateTagDto } from './dto/createTag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getTags(): Promise<Tag[]> {
    return this.tagRepository.getTags();
  }

  async createTag(payload: CreateTagDto): Promise<Tag> {
    return this.tagRepository.createTag(payload);
  }

  async getTag(id: number): Promise<Tag | null> {
    return this.tagRepository.findTagById(id);
  }

  async updateTag(id: number, payload: UpdateTagDto): Promise<Tag> {
    return this.tagRepository.updateTag(id, payload);
  }

  async deleteTag(id: number): Promise<Tag> {
    return this.tagRepository.deleteTag(id);
  }
}
