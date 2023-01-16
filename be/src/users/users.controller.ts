import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidatePipe } from './helpers/joi_validate.pipe';
import { UserSchema } from './helpers/validate_schema_user';
import { BadGatewayException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './interfaceData/interface-login';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new JoiValidatePipe(UserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    const dataRes = await this.usersService.findOneEmail(createUserDto);
    if (!dataRes) {
      await this.usersService.createUser(createUserDto);
      return {
        status: "success",
        messages: "create user successfully"
      }
    } else {
      throw new BadGatewayException({
        status: "error",
        message: "email hava in database"
      })
    }
  }

  @Post("/login")
  async loginProduct(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const data: CreateUserDto = await this.usersService.login(loginUserDto);
    if (data != null) {
      const { email, role } = data;
      const dataRes = this.usersService.generateJWT(data);
      const user = {
        email,
        token: dataRes,
        role
      }
      return { user };
    } else {
      throw new BadGatewayException({
        status: "error",
        message: "Login failed you can check email or password login"
      })
    }
  }

  @Get()
  async findAll(@Req() req: {
    user: {
      email: string;
      id: number
    }
  }) {
    const data = await this.usersService.findAll(req.user.id);
    return data;
  }


  @Get(':email')
  async findOne(@Param() params) {
    return this.usersService.findOne(params.email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
