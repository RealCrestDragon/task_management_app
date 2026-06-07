import { CreateTaskDto } from './createTask.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
