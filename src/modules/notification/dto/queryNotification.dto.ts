import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { NotificationType } from 'generated/prisma/enums';

export class QueryNotificationDto {
  @ApiPropertyOptional({
    enum: NotificationType,
  })
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;

  @ApiPropertyOptional({
    description: 'Page number',
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Result limit per page',
    default: 20,
  })
  @IsNumber()
  @IsOptional()
  limit: number = 20;
}
