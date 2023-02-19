import {
  IsEmail, IsEnum,
  IsString
} from "class-validator";
import Role from "../../role.enum";

export class CreateUserDto {

  @IsString()
  @IsEmail()
  email:string;


  @IsString()
  password: string;

  role: Role;
}

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email:string;

  @IsString()
  password: string;
}

export class ChangeUserRoleDto {
  @IsEnum([Role.User, Role.Admin, Role.Developer])
  role: Role;
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email:string;

  @IsString()
  password: string;

}
