import {
  Table,
  Column,
  Model,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
  DataType,
  HasMany,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Tag } from './tag.entity';
import { TaskTag } from './taskTag.entity';
import { TaskStatus } from '../constants/status.constant';
import { Subtask } from './subtask.entity';
import { User } from './user.entity';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'tasks',
})
export class Task extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare content: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare authorId: number;

  @Column(DataType.DATE)
  declare dueDate: Date;

  @Column(DataType.ENUM(...Object.values(TaskStatus)))
  declare status: TaskStatus;

  @Column(DataType.BOOLEAN)
  declare isPinned: boolean;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;

  @BelongsTo(() => User)
  declare author: User;

  @BelongsToMany(() => Tag, () => TaskTag)
  declare tags: Tag[];

  @HasMany(() => TaskTag)
  declare taskTags: TaskTag[];

  @HasMany(() => Subtask)
  declare subtasks: Subtask[];
}

/* task id, tag (many to many),
 */
