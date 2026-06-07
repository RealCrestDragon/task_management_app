import {
  Table,
  Column,
  Model,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
  Unique,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare username: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.STRING)
  declare fullName: string;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;
}
