import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateExamFormDto } from './dto/create-exam_form.dto';
import { UpdateExamFormDto } from './dto/update-exam_form.dto';
import { ExamForm } from "./entities/exam_form.entity"

@Injectable()
export class ExamFormService {
  constructor(
    @InjectRepository(ExamForm)
    private readonly examRepository: Repository<ExamForm>,
  ) { }

  create(createExamDto: CreateExamFormDto) {
    const ExamCreate = new ExamForm();
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
