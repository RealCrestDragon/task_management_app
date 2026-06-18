import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTagDto } from '../dto/updateTag.dto';
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/createTag.dto';
import { Tag } from 'generated/prisma/client';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  async getTags() {
    return this.prisma.tag.findMany();
  }

  async createTag(payload: CreateTagDto): Promise<Tag> {
    return this.prisma.tag.create({ data: payload });
  }

  async findTagById(id: number): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  async updateTag(id: number, payload: UpdateTagDto): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data: payload,
    });
  }

  async deleteTag(id: number): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
