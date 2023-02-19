import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
require("dotenv").config();

@Injectable()
export class JwtRoleGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;

    if (!result) {
      throw new UnauthorizedException();
    }

    const role = this.reflector.get<string[]>('role', context.getHandler());

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token, { secret: process.env.SECRET_WORD });
    const userRole = decoded.role;

    return userRole === role;
  }
}