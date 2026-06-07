import { TaskStatus } from 'generated/prisma/enums';

export const validTransitions: Record<TaskStatus, TaskStatus[]> = {
  [TaskStatus.ACTIVE]: [TaskStatus.ON_HOLD, TaskStatus.COMPLETED],
  [TaskStatus.ON_HOLD]: [TaskStatus.ACTIVE],
  [TaskStatus.COMPLETED]: [TaskStatus.ARCHIVED],
  [TaskStatus.ARCHIVED]: [],
};
