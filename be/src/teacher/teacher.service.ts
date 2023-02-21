import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  create(createTeacherDto: CreateTeacherDto) {
    const teacherCreate = new Teacher();
    teacherCreate.id_teacher = createTeacherDto.id_teacher;
    teacherCreate.name = createTeacherDto.name;
    teacherCreate.avatar = createTeacherDto.avatar;
    teacherCreate.phone_number = createTeacherDto.phone_number;
    return this.teacherRepository.save(teacherCreate);
  }

  async findAll() {
    try {
      return await this.teacherRepository.find();
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

  findOneTeacher(id: string) {
    return this.teacherRepository.findOneBy({ id_teacher: id });
  }



  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const { id_teacher, name, avatar, phone_number } = updateTeacherDto;
    return this.teacherRepository.update(id, {
      id_teacher: id_teacher,
      name: name,
      avatar: avatar,
      phone_number: phone_number,
    });
  }

  async searchTeacher(name: string) {
    try {
      const data = await this.teacherRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
      });
      return data;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

  async remove(id: number) {
    try {
      const dataAll = await this.teacherRepository.delete(id);
      return dataAll;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

}
