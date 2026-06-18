import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySubtaskDto {
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
