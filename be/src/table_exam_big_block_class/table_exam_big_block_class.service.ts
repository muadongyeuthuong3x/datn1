import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private dataSource: DataSource,
  ) {}

  async create(
    createTableExamBigBlockClassDto: CreateTableExamBigBlockClassDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const { id_exam, time_year_start, time_year_end, id_big_class_exam } =
        createTableExamBigBlockClassDto;
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
        queryRunner: queryRunner.manager,
      } as any;
      const dataRes = await this.tableBigClassExamService.create(
        dataCreateBigCalssExam,
      );
      await queryRunner.commitTransaction();
      return dataRes;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        status: 'error',
        message: 'server error',
      });
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      return await this.examBigClassRepository
        .createQueryBuilder('table_exam_big_block_class')
        .select([
          'table_exam_big_block_class.id',
          'table_exam_big_block_class.time_year_start',
          'table_exam_big_block_class.time_year_end',
          'exam.id',
          'exam.name',
          'table-big-class-exam.id',
          'big_block_class.bigBlockClass',
          'big_block_class.id',
        ])
        .innerJoin('table_exam_big_block_class.id_exam', 'exam')
        .innerJoin(
          'table_exam_big_block_class.id_big_class_exam',
          'table-big-class-exam',
        )
        .innerJoin('table-big-class-exam.id_big_class_exam', 'big_block_class')
        .getMany();
    } catch (error) {
      throw new BadGatewayException({
        status: 'error',
        message: 'server error',
      });
    }
  }

  async findOneData(data: { id_exam_where: any; time_year_start: any }) {
    const { id_exam_where, time_year_start } = data;
    return await this.examBigClassRepository.findOneBy({
      id_exam_where: id_exam_where,
      time_year_start: time_year_start,
    });
  }

  async update(
    id: number,
    updateTableExamBigBlockClassDto: UpdateTableExamBigBlockClassDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const { id_exam, id_big_class_exam } = updateTableExamBigBlockClassDto;
      await queryRunner.manager.update(TableExamBigBlockClass, id, {
        id_exam: id_exam,
        id_exam_where: id_exam,
      });
      const dataUpdateBigCalssExam = {
        id_big_class_exam: id_big_class_exam,
        id: id,
        queryRunner: queryRunner.manager,
      } as any;
      await this.tableBigClassExamService.update(dataUpdateBigCalssExam);
      await queryRunner.commitTransaction();
      return 'success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        status: 'error',
        message: 'server error',
      });
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    try {
      const dataAll = await this.examBigClassRepository.delete(id);
      return dataAll;
    } catch (error) {
      throw new BadGatewayException({
        status: 'error',
        message: 'server error',
      });
    }
  }

  async findSearchExamBigBlockClass(data: CreateTableExamBigBlockClassDto) {
    const { id_exam_where, time_year_end, time_year_start } = data;
    try {
      const dataRes = await this.examBigClassRepository
        .createQueryBuilder('table_exam_big_block_class')
        .select([
          'table_exam_big_block_class.id',
          'table_exam_big_block_class.time_year_start',
          'table_exam_big_block_class.time_year_end',
          'exam.id',
          'exam.name',
          'table-big-class-exam.id',
          'big_block_class.bigBlockClass',
          'big_block_class.id',
        ])
        .innerJoin('table_exam_big_block_class.id_exam', 'exam')
        .innerJoin(
          'table_exam_big_block_class.id_big_class_exam',
          'table-big-class-exam',
        )
        .innerJoin('table-big-class-exam.id_big_class_exam', 'big_block_class')
        .where('(table_exam_big_block_class.id_exam_where like :id_exam_where)')
        .andWhere(
          '(table_exam_big_block_class.time_year_start like :time_year_start AND table_exam_big_block_class.time_year_end like :time_year_end)',
        )
        .setParameters({
          id_exam_where: `%${id_exam_where}%`,
          time_year_start: `%${time_year_start}%`,
          time_year_end: `%${time_year_end}%`,
        })
        .getMany();
      return dataRes;
    } catch (error) {
      throw new BadGatewayException({
        status: 'error',
        message: 'server error',
      });
    }
  }
}
