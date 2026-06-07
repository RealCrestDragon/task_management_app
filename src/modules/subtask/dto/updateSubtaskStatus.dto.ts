import { IsEnum } from 'class-validator';
import { TaskStatus } from 'generated/prisma/enums';

export class UpdateSubtaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
