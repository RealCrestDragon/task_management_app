import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AssignTask {
  @ApiProperty({ description: 'ID of Task assignee' })
  @IsNumber()
  assignedToId: number;

  @ApiPropertyOptional({ description: 'Role of Task assignee' })
  @IsString()
  @IsOptional()
  role?: string;
}

export class AssignTaskDto {
  @ApiProperty({
    description: 'List of roles and IDs of Task assignees',
    type: () => AssignTask,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignTask)
  assignTasks: AssignTask[];
}
