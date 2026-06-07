import { NotificationType } from 'generated/prisma/enums';

export interface NotificationPayload {
  userId: number;
  taskId?: number;
  subtaskId?: number;
  title: string;
  content?: string;
  type: NotificationType;
}
