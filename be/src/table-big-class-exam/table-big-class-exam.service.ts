import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableBigClassExamDto } from './dto/create-table-big-class-exam.dto';
import { UpdateTableBigClassExamDto } from './dto/update-table-big-class-exam.dto';
import { TableBigClassExam } from './entities/table-big-class-exam.entity';

@Injectable()
export class TableBigClassExamService {
  constructor(
    @InjectRepository(TableBigClassExam)
    private readonly tableBigClassExamRepository: Repository<TableBigClassExam>
  ) { }
  async create(createTableBigClassExamDto: {
    id_big_class_exam: Number[];
    id: Number;
    queryRunner: any;
  }) {
    const { id_big_class_exam, id, queryRunner } = createTableBigClassExamDto;
    const data = []
    for (let i = 0; i < id_big_class_exam.length; i++) {
      const newDataBigClassExam = new TableBigClassExam();
      newDataBigClassExam.id_big_class_exam = id_big_class_exam[i] as any;
      newDataBigClassExam.id_exam_big_block_class = id as any;
      const dataRes =  await queryRunner.save(newDataBigClassExam);
      data.push(dataRes);
    }
    return data ;
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
