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
import { Task } from './task.entity';
import { Tag } from './tag.entity';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'task_tags',
})
export class TaskTag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Task)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare taskId: number;

  @ForeignKey(() => Tag)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare tagId: number;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;

  @BelongsTo(() => Task)
  declare task: Task;

  @BelongsTo(() => Tag)
  declare tag: Tag;
}

/* task id, tag (many to many),
 */
