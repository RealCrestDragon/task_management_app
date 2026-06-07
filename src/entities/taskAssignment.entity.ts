import {
  Table,
  Column,
  Model,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Task } from './task.entity';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'task_assignments',
})
export class TaskAssignment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Task)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare taskId: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare assigneeId: number;

  @Column(DataType.STRING)
  declare role: string;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;

  @BelongsTo(() => Task)
  declare task: Task;

  @BelongsTo(() => User)
  declare assignee: User;
}

/* task id, tag (many to many),
 */
