import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req, Put } from '@nestjs/common';
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
      const data =   await this.usersService.createUser(createUserDto);
      return {
        status: "success",
        message: data
      }
    } else {
      throw new BadGatewayException({
        status: "error",
        message: "Đã tồn tại email này trong database"
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
        message: "Tài khoản hoặc mật khẩu không đúng"
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

  @Post('/search')
  async findEamil(@Body() data: { email: string }) {
    return this.usersService.findEamil(data.email);
  }


  @Put('/edit')
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
