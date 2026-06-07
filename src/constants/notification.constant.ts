import { NotificationType } from 'generated/prisma/enums';

export const NOTIFICATION_CONTENT = {
  [NotificationType.TASK_ASSIGNED]: {
    title: 'Task Assigned',
    content: 'You have been assigned to a task',
  },
  [NotificationType.TASK_REMINDER]: {
    title: 'Task Due Soon',
    content: 'Your task is due tomorrow',
  },
  [NotificationType.SUBTASK_ASSIGNED]: {
    title: 'Subtask Assigned',
    content: 'You have been assigned to a subtask',
  },
  [NotificationType.SUBTASK_REMINDER]: {
    title: 'Subtask Due Soon',
    content: 'Your subtask is due tomorrow',
  },
};
