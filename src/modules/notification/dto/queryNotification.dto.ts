import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { NotificationType } from 'generated/prisma/enums';

export class QueryNotificationDto {
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;

  @IsNumber()
  @IsOptional()
  limit: number = 20;

  @IsNumber()
  @IsOptional()
  page: number = 1;
}
