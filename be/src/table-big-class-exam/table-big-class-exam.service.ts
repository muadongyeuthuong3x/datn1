import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableBigClassExam } from './entities/table-big-class-exam.entity';

@Injectable()
export class TableBigClassExamService {
  constructor(
    @InjectRepository(TableBigClassExam)
    private readonly tableBigClassExamRepository: Repository<TableBigClassExam>,
  ) {}
  async create(createTableBigClassExamDto: {
    id_big_class_exam: number[];
    id: number;
    queryRunner: any;
  }) {
    const { id_big_class_exam, id, queryRunner } = createTableBigClassExamDto;
    const data = [];
    for (let i = 0; i < id_big_class_exam.length; i++) {
      const newDataBigClassExam = new TableBigClassExam();
      newDataBigClassExam.id_big_class_exam = id_big_class_exam[i] as any;
      newDataBigClassExam.id_exam_big_block_class = id as any;
      newDataBigClassExam.id_exam_big_block_class_query = id as any;
      newDataBigClassExam.id_big_block_class_query = id_big_class_exam[
        i
      ] as any;
      const dataRes = await queryRunner.save(newDataBigClassExam);
      data.push(dataRes);
    }
    return data;
  }

  findAll() {
    return `This action returns all tableBigClassExam`;
  }

  async findOne(id: any) {
    return await this.tableBigClassExamRepository.findOne({
      where: {
        id_exam_big_block_class: id,
      },
    });
  }

  async update(updateData: {
    id_big_class_exam: number[];
    id: string;
    queryRunner: any;
  }) {
    const { id_big_class_exam, id, queryRunner } = updateData;

    const dataIdOld = await this.tableBigClassExamRepository.find({
      where: {
        id_exam_big_block_class_query: id,
      },
    });
    const formatNumber: number[] = [];
    id_big_class_exam.map((e) => {
      formatNumber.push(Number(e));
    });
    const arrayIdOld: number[] = [];
    const arrayDelete: number[] = [];
    const arrayCreate: number[] = [];
    dataIdOld.map((e) => {
      return arrayIdOld.push(Number(e.id_big_block_class_query));
    });
    const arrayConcat: number[] = arrayIdOld.concat(id_big_class_exam);
    const arraySlice = arrayConcat.filter(
      (c) => arrayConcat.indexOf(c) == arrayConcat.lastIndexOf(c),
    );

    for (let i = 0; i < arraySlice.length; i++) {
      if (!arrayIdOld.includes(arraySlice[i])) {
        arrayCreate.push(arraySlice[i]);
      }
      if (!id_big_class_exam.includes(arraySlice[i])) {
        arrayDelete.push(arraySlice[i]);
      }
    }

    for (let i = 0; i < arrayDelete.length; i++) {
      await queryRunner.delete(TableBigClassExam, {
        id_big_block_class_query: arrayDelete[i],
      });
    }

    for (let i = 0; i < arrayCreate.length; i++) {
      const newDataBigClassExam = new TableBigClassExam();
      newDataBigClassExam.id_big_class_exam = arrayCreate[i] as any;
      newDataBigClassExam.id_exam_big_block_class = id as any;
      newDataBigClassExam.id_exam_big_block_class_query = id as any;
      newDataBigClassExam.id_big_block_class_query = arrayCreate[i] as any;
      await queryRunner.save(newDataBigClassExam);
    }
    return 'success';
  }

  remove(id: number) {
    return `This action removes a #${id} tableBigClassExam`;
  }
}
