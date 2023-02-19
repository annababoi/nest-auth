import { Injectable } from "@nestjs/common";
import { ChangeUserRoleDto, CreateUserDto, UpdateUserDto } from "./dto/create.user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async getAll() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }


  async createUser(user: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

      return await this.userRepository.create({ ...user, password: hashedPassword });
    } catch (e) {
      console.log(e);
    }

  };

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return await user.update(updateUserDto, { where: { id } });
    } catch (e) {
      console.log(e);
    }
  }

  async changeUserRole(id: string, changeUserRoleDto: ChangeUserRoleDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      return  await user.update(changeUserRoleDto, { where: { id } });;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(id: string) {
    return this.userRepository.destroy({ where: { id } });
  }

}
