import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AssignSubtask {
  @IsNumber()
  assignedToId: number;

  @IsString()
  @IsOptional()
  role?: string;
}

export class AssignSubtaskDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignSubtask)
  assignSubtasks: AssignSubtask[];
}
