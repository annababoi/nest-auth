import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
@Table({ tableName: "tokens" })
export class Token extends Model<Token> {

  @Column({ type: DataType.STRING })
  accessToken: string;

  @ForeignKey(()=> User)
  @Column({ type: DataType.STRING })
  userId: string;
}