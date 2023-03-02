import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { ClassService } from 'src/class/class.service';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    @Inject(forwardRef(() => ClassService))
    private readonly studentRepository: Repository<Student>,
    private readonly classService: ClassService,
    private dataSource: DataSource,
  ) {}

  async create(
    id_exam: TableExamBigBlockClass,
    createStudentDto: CreateStudentDto[],
    name: string,
    res: any,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let checkRollBack = false;
    try {
      await Promise.all(
        createStudentDto.map(async (item) => {
          const studentCreate = new Student();
          const getValue = Object.values(item);
          studentCreate.code_student = getValue[1];
          studentCreate.name = getValue[2];
          studentCreate.point_diligence = getValue[3];
          studentCreate.point_beetween = getValue[4];
          studentCreate.id_exam_big_class = id_exam;
          studentCreate.id_exam_query = id_exam as any;
          const result = await this.findDataIsExit(getValue[1], id_exam);
          if (result) {
            await queryRunner.manager.save(studentCreate);
          } else {
            checkRollBack = true;
            return res.status(500).json({
              status: 'error',
              message: `Điểm giữa kì có môn ${name} mã sinh viên ${getValue[1]} đã tồn tại`,
            });
          }
        }),
      );
      !checkRollBack && (await queryRunner.commitTransaction());
      return res.status(200).json({
        status: 'succes',
        message: `Upload thành công`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        error: 'error',
        message: 'server error',
      });
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findDataIsExit(code_student: string, id_exam_query: any) {
    try {
      const data = await this.studentRepository.findBy({
        code_student: code_student,
        id_exam_query: id_exam_query,
      });
      if (data.length === 0) {
        return false;
      } else {
        return data;
      }
    } catch (error) {
      throw new BadGatewayException({
        error: 'error',
        message: 'Server error',
      });
    }
  }

  async createScoreEnd(
    id_exam: TableExamBigBlockClass,
    createStudentDto: CreateStudentDto[],
    name: string,
    res: any,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let checkRollBack = false;
    try {
      await Promise.all(
        createStudentDto.map(async (item) => {
          const getValue = Object.values(item);
          const result: any = await this.findDataIsExitAnhUpdate(
            getValue[1],
            id_exam,
          );
          if (!!result) {
            const { id } = result;
            await queryRunner.manager.update(Student, id, {
              point_end: getValue[3],
            });
          } else {
            checkRollBack = true;
            return res.status(500).json({
              status: 'error',
              message: `Điểm  môn ${name} mã sinh viên ${getValue[1]} không tồn tại trong hệ thống`,
            });
          }
        }),
      );
      !checkRollBack && (await queryRunner.commitTransaction());
      return res.status(200).json({
        status: 'succes',
        message: `Upload thành công`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        error: 'error',
        message: 'server error',
      });
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findDataIsExitAnhUpdate(code_student: string, id_exam_query: any) {
    try {
      const data = await this.studentRepository.findOneBy({
        code_student: code_student,
        id_exam_query: id_exam_query,
      });
      return data;
    } catch (error) {
      throw new BadGatewayException({
        error: 'error',
        message: `Mã sinh viên ${code_student} không tồn tại trong hệ thống`,
      });
    }
  }

  async updateAllStudent(array: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await this.importCSV(array, queryRunner.manager);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        status: 'error',
        message: 'server error',
      });
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  importCSV(array: any, callBack: any) {
    for (let i = 0; i < array.length; i++) {
      const newStudnet = new Student();
      const { name, code_student } = array[i];
      newStudnet.code_student = code_student;
      newStudnet.name = name;
      return callBack.save(newStudnet);
    }
  }

  findOneExamBigBlockClass() { }

  findOneClass(id_class_kma: number) {
    return this.classService.findOne(id_class_kma);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(code_student: number) {
    return this.studentRepository.findOneBy({ id: code_student });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
