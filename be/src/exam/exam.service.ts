import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './entities/exam.entity'
@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) { }

  create(createExamDto: CreateExamDto) {
    const ExamCreate = new Exam();
    ExamCreate.name = createExamDto.name;
    return this.examRepository.save(ExamCreate);
  }

  findAll() {
    return this.examRepository.find();
  }

  findOneExam(name: string) {
    return this.examRepository.findOneBy({ name: name });
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  async update(id: number, name: string) {
    return await this.examRepository.update(id, { name });
  }

  async findSearchExam(name: string) {
    const data = await this.examRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
    return data;
  }

  async remove(id: number) {
    try {
      const dataAll = await this.examRepository.delete(id);
      return dataAll;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }
}
