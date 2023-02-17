import { BadGatewayException, Injectable } from '@nestjs/common';
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
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
  ) { }

  async findOneEmail(createUserDto: CreateUserDto) {
    const data = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    return data;
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const data = await this.usersRepository.findOne({
        where: {
          email: loginUserDto.email,
        },
      });
      if (!data) {
        return null;
      }
      const isMatch = await bcrypt.compare(loginUserDto.password, data.password);
      if (isMatch) {
        return data;
      }
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      })
    }

  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    let newUser = new UserEntity();
    newUser.email = createUserDto.email;
    newUser.password = hash;
    newUser.role = createUserDto.role;
    newUser.name = createUserDto.name;
    const data = await this.usersRepository.save(newUser);
    return data;
  }

  public generateJWT(user: any) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }

  async findAll(id: number) {
    const dataAll = await this.usersRepository.find({ where: { id: Not(id) }, select: ["id", "email", "role", "name"] })
    return dataAll;
  }

  async findOne(email: string) {
    const data = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return data;
  }

  async findEamil(email: string) {
    const data = await this.usersRepository.find({
      where: {
        email: Like(`%${email}%`),
      },
      select: ["id", "email", "role", "name"]
    });
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      const dataAll = await this.usersRepository.delete(id);
      return dataAll;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }
}
