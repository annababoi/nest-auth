import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put, SetMetadata, UseGuards
} from "@nestjs/common";
import { ChangeUserRoleDto, CreateUserDto, UpdateUserDto } from "./dto/create.user.dto";
import { UserService } from "./user.service";
import Role from "../role.enum";
import { JwtRoleGuard } from "../auth/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @SetMetadata('role', Role.Admin)
  @UseGuards(JwtRoleGuard)
  getAllUsers() {
    return this.userService.getAll();
  }

  @Post()
  createUSer(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get("/:id")
  getOneUserById(@Param("id") id: string) {
    return this.userService.findOneById(id);
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Put('/:id')
  changeUserRole(@Param("id") id: string, @Body() changeUserRoleDto: ChangeUserRoleDto) {
    return this.userService.changeUserRole(id, changeUserRoleDto);
  }


  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

}
