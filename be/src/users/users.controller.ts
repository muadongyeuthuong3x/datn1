import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto  } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidatePipe } from './helpers/joi_validate.pipe';
import { UserSchema } from './helpers/validate_schema_user';
import { BadGatewayException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './interfaceData/interface-login';
         

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidatePipe(UserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    const dataRes =  await this.usersService.findOneEmail(createUserDto);
    if(!dataRes){
      await this.usersService.createUser(createUserDto);
      return {
        success : true,
        messages : "create user successfully"
      }
    }else {
      throw new BadGatewayException({
        error : "error",
        message : "email hava in database"
    })
    }
  }
  
  @Post("/login")
  async loginProduct(@Body() loginUserDto: LoginUserDto) : Promise<UserRO>  {
    const  data : CreateUserDto = await this.usersService.login(loginUserDto);
    if(data){
      const {email , role} = data;
     const dataRes = await this.usersService.generateJWT(data);
     const user = {
      email,
      token : dataRes,
      role
     }
     
     return  { user };
    }else {
      throw new BadGatewayException({
        error : "error",
        message : "login failed you can check email or password login"
    })
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
