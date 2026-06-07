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
import { TaskStatus } from '../constants/status.constant';
import { Task } from './task.entity';
import { User } from './user.entity';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'subtasks',
})
export class Subtask extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Task)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare taskId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare authorId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare content: string;

  @Column(DataType.DATE)
  declare dueDate: Date;

  @Column(DataType.ENUM(...Object.values(TaskStatus)))
  declare status: TaskStatus;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;

  @BelongsTo(() => Task)
  declare task: Task;

  @BelongsTo(() => User)
  declare author: User;
}

/* task id, tag (many to many),
 */
