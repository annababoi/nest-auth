import { Body, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../user/dto/create.user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Token } from "./token.model";


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne(loginDto.email);
    if(user) {
      const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);

      if (isPasswordMatch) {
        const result = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    await this.tokenRepository.create({ accessToken, userId: user.id });

    return { token: accessToken, role: user.role, id: user.id, email: user.email };
  }
}