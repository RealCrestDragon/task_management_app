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

export class QueryTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDateFrom?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDateTo?: Date;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  authorId?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isPinned?: boolean;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  assignedToIds?: number[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
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
