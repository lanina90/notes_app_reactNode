import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'user_notes',
  timestamps: false,
})
export class UserNote extends Model<UserNote> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  content: string;

  @AllowNull(false)
  @Column
  category: string;

  @AllowNull(false)
  @Column
  created: string;

  @AllowNull(true)
  @Column
  dates: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  archived: boolean;
}