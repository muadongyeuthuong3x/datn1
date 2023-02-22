import { Injectable } from '@nestjs/common';
import { CreateTableBigClassExamDto } from './dto/create-table-big-class-exam.dto';
import { UpdateTableBigClassExamDto } from './dto/update-table-big-class-exam.dto';

@Injectable()
export class TableBigClassExamService {
  create(createTableBigClassExamDto: CreateTableBigClassExamDto) {
    return 'This action adds a new tableBigClassExam';
  }

  findAll() {
    return `This action returns all tableBigClassExam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tableBigClassExam`;
  }

  update(id: number, updateTableBigClassExamDto: UpdateTableBigClassExamDto) {
    return `This action updates a #${id} tableBigClassExam`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableBigClassExam`;
  }
}
