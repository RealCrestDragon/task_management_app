import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AssignSubtask {
  @ApiProperty({ description: 'ID of Subtask assignee' })
  @IsNumber()
  assignedToId: number;

  @ApiPropertyOptional({ description: 'Role of Subtask assignee' })
  @IsString()
  @IsOptional()
  role?: string;
}

export class AssignSubtaskDto {
  @ApiProperty({
    description: 'List of roles and IDs of Subtask assignees',
    type: () => AssignSubtask,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignSubtask)
  assignSubtasks: AssignSubtask[];
}
