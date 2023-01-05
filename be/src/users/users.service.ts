import { Injectable } from '@nestjs/common';
import { UserEntity }  from "./entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import jwt from 'jsonwebtoken';
import {  ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
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
    if (!data)
    return null;
    if(await bcrypt.compare(loginUserDto.password , data.password))
    return null;
   return data;
}

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hashSync(createUserDto.email, salt);
    let newUser = new UserEntity();
    newUser.email = createUserDto.email;
    newUser.password = hash;
    newUser.role = createUserDto.role;
    const data = await this.usersRepository.save(newUser);
    return data;
}

  generateJWT(user){
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, ConfigService.call('POSTGRES_USER'));
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
