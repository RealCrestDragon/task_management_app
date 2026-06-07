import { CreateTagDto } from './createTag.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
