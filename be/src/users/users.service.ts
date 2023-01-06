import { Injectable } from '@nestjs/common';
import { UserEntity }  from "./entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneEmail(createUserDto: CreateUserDto) {
      const data = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    return data;
  }

  async login(loginUserDto: LoginUserDto) {
    const data = await this.usersRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });
    if(!data){
      return null;
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, data.password);
    if(isMatch){
      return data;
    } 
   return null;
}

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash =  await bcrypt.hash(createUserDto.password, salt);
    let newUser = new UserEntity();
    newUser.email = createUserDto.email;
    newUser.password = hash;
    newUser.role = createUserDto.role;
    const data = await this.usersRepository.save(newUser);
    return data;
}

  public generateJWT(user ){
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
