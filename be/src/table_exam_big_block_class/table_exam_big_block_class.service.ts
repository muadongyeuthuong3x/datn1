import { BadGatewayException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
import { TableBigClassExamService } from 'src/table-big-class-exam/table-big-class-exam.service';
import { DataSource, Repository } from 'typeorm';
import { CreateTableExamBigBlockClassDto } from './dto/create-table_exam_big_block_class.dto';
import { UpdateTableExamBigBlockClassDto } from './dto/update-table_exam_big_block_class.dto';
import { TableExamBigBlockClass } from './entities/table_exam_big_block_class.entity';

@Injectable()
export class TableExamBigBlockClassService {

  constructor(
    @InjectRepository(TableExamBigBlockClass)
    @Inject(forwardRef(() => TableBigClassExamService))
    private readonly examBigClassRepository: Repository<TableExamBigBlockClass>,
    private readonly tableBigClassExamService: TableBigClassExamService,
    private dataSource: DataSource
  ) { }


  async create(createTableExamBigBlockClassDto: CreateTableExamBigBlockClassDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const { id_exam, time_year_start, time_year_end, id_big_class_exam } = createTableExamBigBlockClassDto;
      const newData = new TableExamBigBlockClass();
      newData.id_exam = id_exam;
      newData.time_year_start = time_year_start;
      newData.time_year_end = time_year_end;
      newData.id_exam_where = id_exam;
      const dataCreate = await queryRunner.manager.save(newData);
      const { id } = dataCreate;
      const dataCreateBigCalssExam = {
        id_big_class_exam: id_big_class_exam,
        id: id,
        queryRunner: queryRunner.manager
      } as any;
      const dataRes = await this.tableBigClassExamService.create(dataCreateBigCalssExam);
      await queryRunner.commitTransaction();
      return dataRes;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error)
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      // return await this.examBigClassRepository.find({
      //   relations: {
      //     id_big_block_class: true,
      //     id_exam: true
      //   },
      // });
      return [];
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }
  }

  async findOneData(data: { id_exam_where: any, time_year_start: any }) {
    const { id_exam_where, time_year_start } = data;
    return await this.examBigClassRepository.findOneBy({
       id_exam_where: id_exam_where,
      time_year_start: time_year_start,
    });
  }

  update(id: number, updateTableExamBigBlockClassDto: UpdateTableExamBigBlockClassDto) {
    return `This action updates a #${id} tableExamBigBlockClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableExamBigBlockClass`;
  }
}
