import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  SortingDirections,
  TaskSortingFields,
} from 'src/constants/sorting.constant';
import { TaskStatus } from 'generated/prisma/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryTaskDto {
  @ApiPropertyOptional({ description: 'Part of task name, case insensitive' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Start of due date period',
    example: '2024-01-15T08:00:00Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDateFrom?: Date;

  @ApiPropertyOptional({
    description: 'End of due date period',
    example: '2024-01-15T08:00:00Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDateTo?: Date;

  @ApiPropertyOptional({ description: 'Id of Task author' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  authorId?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isPinned?: boolean;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'IDs of Assignees',
    example: [1, 2, 3],
    isArray: true,
    type: Number,
  })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  assignedToIds?: number[];

  @ApiPropertyOptional({
    description: 'IDs of Assigners',
    example: [1, 2, 3],
    isArray: true,
    type: Number,
  })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  assignedByIds?: number[];

  @ApiPropertyOptional({
    description: 'Sorting field name',
    enum: TaskSortingFields,
  })
  @IsEnum(TaskSortingFields)
  @IsOptional()
  orderBy?: TaskSortingFields;

  @ApiPropertyOptional({
    description: 'Sorting order',
    enum: SortingDirections,
  })
  @IsEnum(SortingDirections)
  @IsOptional()
  orderDirection?: SortingDirections;

  @ApiPropertyOptional({
    description: 'Page number',
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Result limit per page',
    default: 20,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 20;
}
