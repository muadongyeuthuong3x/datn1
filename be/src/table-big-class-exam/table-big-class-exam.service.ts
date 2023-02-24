import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableBigClassExam } from './entities/table-big-class-exam.entity';

@Injectable()
export class TableBigClassExamService {
  constructor(
    @InjectRepository(TableBigClassExam)
    private readonly tableBigClassExamRepository: Repository<TableBigClassExam>,
  ) { }
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
      newDataBigClassExam.id_exam_big_block_class_query = id_big_class_exam[
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
    const formatNumber_id_big_class_exam: number[] = [];
    id_big_class_exam.map((e) => {
      formatNumber.push(+e);
    });
    const arrayIdOld: string[] = [];
    const arrayDelete: number[] = [];
    const arrayCreate: number[] = [];
    dataIdOld.map((e) => {
      return arrayIdOld.push(e.id_exam_big_block_class_query);
    });
    const formatNumber_arrayIdOld: number[] = [];
    arrayIdOld.map((e) => {
      formatNumber_arrayIdOld.push(+e);
    });
    console.log("id class old new ", id_big_class_exam)
    console.log("id classs query ", formatNumber_arrayIdOld)
    console.log("id classs format ", formatNumber)
    const arrayConcat: number[] = formatNumber_arrayIdOld.concat(
      formatNumber_id_big_class_exam,
    );
    console.log(arrayConcat);
    const arraySlice = [...new Set(arrayConcat)] as any;
    console.log(arraySlice);
    for (let i = 0; i < arraySlice.length; i++) {
      if (formatNumber.includes(arraySlice[i])) {
        arrayDelete.push(arraySlice[i]);
      } else if (!arrayIdOld.includes(arraySlice[i])) {
        arrayCreate.push(arraySlice[i]);
      }
    }

    for (let i = 0; i < arrayDelete.length; i++) {
      await queryRunner.delete(TableBigClassExam, {
        id_exam_big_block_class: id,
      });
    }

    for (let i = 0; i < arrayCreate.length; i++) {
      const newDataBigClassExam = new TableBigClassExam();
      newDataBigClassExam.id_big_class_exam = id_big_class_exam[i] as any;
      newDataBigClassExam.id_exam_big_block_class = id as any;
      await queryRunner.save(newDataBigClassExam);
    }
    return 'success';
  }

  remove(id: number) {
    return `This action removes a #${id} tableBigClassExam`;
  }
}
