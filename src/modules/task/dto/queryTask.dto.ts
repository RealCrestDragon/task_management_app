import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  SortingDirections,
  TaskSortingFields,
} from 'src/constants/sorting.constant';
import { TaskStatus } from 'generated/prisma/enums';

export class QueryTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  dueDateFrom?: Date;

  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  dueDateTo?: Date;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  authorId?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isPinned?: boolean;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  assignedToIds?: number[];

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  assignedByIds?: number[];

  @IsEnum(TaskSortingFields)
  @IsOptional()
  orderBy?: TaskSortingFields;

  @IsEnum(SortingDirections)
  @IsOptional()
  orderDirection?: SortingDirections;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 20;
}
