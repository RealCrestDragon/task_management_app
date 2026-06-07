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
  Unique,
} from 'sequelize-typescript';
import { Task } from './task.entity';
import { TaskTag } from './taskTag.entity';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'tags',
})
export class Tag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare description: string;

  @Column(DataType.STRING)
  declare color: string;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;

  @BelongsToMany(() => Task, () => TaskTag)
  declare tasks: Task[];

  @HasMany(() => TaskTag)
  declare taskTags: TaskTag[];
}
