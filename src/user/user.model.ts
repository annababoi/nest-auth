import { Column, DataType, Model, Table } from "sequelize-typescript";
import Role from "../role.enum";

@Table({ tableName: "users" })
export class User extends Model<User> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.ENUM("USER", "ADMIN", "DEVELOPER"),
    defaultValue: Role.User
  })
  role: Role;
}