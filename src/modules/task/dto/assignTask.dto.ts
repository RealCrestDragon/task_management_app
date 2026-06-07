import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AssignTask {
  @IsNumber()
  assignedToId: number;

  @IsString()
  @IsOptional()
  role?: string;
}

export class AssignTaskDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignTask)
  assignTasks: AssignTask[];
}
