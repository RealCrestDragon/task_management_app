import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;
}
