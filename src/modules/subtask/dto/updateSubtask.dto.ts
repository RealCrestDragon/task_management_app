import { CreateSubtaskDto } from './createSubtask.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSubtaskDto extends PartialType(CreateSubtaskDto) {}
