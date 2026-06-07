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
import { Subtask } from './subtask.entity';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'subtask_assignments',
})
export class SubtaskAssignment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Subtask)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare subtaskId: number;

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

  @BelongsTo(() => Subtask)
  declare subtask: Subtask;

  @BelongsTo(() => User)
  declare assignee: User;
}

/* task id, tag (many to many),
 */
