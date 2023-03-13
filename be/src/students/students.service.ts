import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { ClassService } from 'src/class/class.service';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { TableExamBigBlockClassService } from 'src/table_exam_big_block_class/table_exam_big_block_class.service';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    @Inject(forwardRef(() => ClassService))
    private readonly studentRepository: Repository<Student>,
    private readonly classService: ClassService,
    private dataSource: DataSource,
    private examBigClassRepository: TableExamBigBlockClassService,
  ) { }

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
          if (
            getValue[3] > 10 ||
            getValue[3] < 0 ||
            getValue[4] > 10 ||
            getValue[4] < 0
          ) {
            res.status(500).json({
              status: 'error',
              message: `Điểm cần phải lớn hơn 0 hoặc bằng không hoặc nhỏ hơn 10`,
            });
          }
          studentCreate.id_exam_big_class = id_exam;
          studentCreate.id_exam_query = id_exam as any;
          const result = await this.findDataIsExit(getValue[1], id_exam);
          if (!result) {
            await queryRunner.manager.save(studentCreate);
          } else {
            checkRollBack = true;
            res.status(500).json({
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

  async createScoreStudent(data: CreateStudentDto, res: any) {
    // try {
    //   const { point_diligence
    //     point_beetween
    //     point_end
    //     point_end_end
    //     why_edit_point_end   } = data;
    //   if (
    //     getValue[3] > 10 ||
    //     getValue[3] < 0 ||
    //     getValue[4] > 10 ||
    //     getValue[4] < 0
    //   ) {
    //     res.status(500).json({
    //       status: 'error',
    //       message: `Điểm cần phải lớn hơn 0 hoặc bằng không hoặc nhỏ hơn 10`,
    //     });
    //   }
    // } catch (error) {
    //   res.status(500).json({
    //     status: 'error',
    //     message: `Server error`,
    //   });
    // }
  }

  async findDataIsExit(code_student: string, id_exam_query: any) {
    try {
      const data = await this.studentRepository.findOneBy({
        code_student: code_student,
        id_exam_query: id_exam_query,
      });
      return data;
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

          if (getValue[3] > 10 || getValue[3] < 0) {
            res.status(500).json({
              status: 'error',
              message: `Điểm cần phải lớn hơn 0 hoặc bằng không hoặc nhỏ hơn 10`,
            });
          }
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

  async createScoreEndEnd(
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
          if (getValue[3] > 10 || getValue[3] < 0) {
            res.status(500).json({
              status: 'error',
              message: `Điểm cần phải lớn hơn 0 hoặc bằng không hoặc nhỏ hơn 10`,
            });
          }
          if (!!result) {
            const { id } = result;
            await queryRunner.manager.update(Student, id, {
              point_end_end: getValue[3],
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

  async searchScoreStudent(
    data: {
      id_exam_where: string;
      time_year_start: string;
      time_year_end: string;
    },
    res: any,
  ) {
    try {
      const { id_exam_where, time_year_start } = data;
      if (id_exam_where.length < 1 || time_year_start.length < 1) {
        return res.status(500).json({
          status: 'error',
          message: 'Vui lòng chọn lớp và năm thi',
        });
      }
      const getDataExam = await this.examBigClassRepository.findOneData({
        id_exam_where,
        time_year_start,
      });
      const id_exam_query_find: any = getDataExam?.id;
      if (!id_exam_query_find) {
        return res.status(200).json({
          status: 'succes',
          message: [],
        });
      }
      const dataRes = await this.studentRepository.find({
        where: {
          id_exam_query: id_exam_query_find,
        },
      });
      return res.status(200).json({
        status: 'succes',
        message: dataRes,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'server error',
      });
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

  findOneClass(id_class_kma: number) {
    return this.classService.findOne(id_class_kma);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(code_student: number) {
    return this.studentRepository.findOneBy({ id: code_student });
  }
  findOneScore(id: string, res: any) {
    try {
      return this.studentRepository.findOneBy({ id_exam_query: id });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'server error',
      });
    }
  }

  async update(id: number, updateStudentDto: any, res: any) {
    try {
      const {
        point_beetween,
        point_diligence,
        point_end,
        point_end_end,
        why_edit_point_end,
        why_edit_point_end_end,
      } = updateStudentDto;

      if (
        point_beetween > 10 ||
        point_beetween < 0 ||
        point_diligence > 10 ||
        point_diligence < 0 ||
        point_end > 10 ||
        point_end < 0 ||
        point_end_end > 10 ||
        point_end_end < 0
      ) {
        res.status(500).json({
          status: 'error',
          message: `Điểm cần phải lớn hơn 0 hoặc bằng không hoặc nhỏ hơn 10`,
        });
      }

      await this.studentRepository.update(id, {
        point_beetween: point_beetween,
        point_diligence: point_diligence,
        point_end: point_end,
        point_end_end: point_end_end,
        why_edit_point_end: why_edit_point_end,
        why_edit_point_end_end: why_edit_point_end_end,
      });
      return res.status(200).json({
        status: 'succes',
        message: 'Sửa điểm thành công',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'server error',
      });
    }
  }

  async remove(id: number) {
    try {
      const dataAll = await this.studentRepository.delete(id);
      return dataAll;
    } catch (error) {
      throw new BadGatewayException({
        status: 'error',
        message: 'Server error ',
      });
    }
  }

  // async findOneCountScoreStudent(
  //   id: number,
  //   scoreStart: number,
  //   scoreEnd: number,
  //   res: any,
  // ) {
  //   try {
  //     const data = await this.studentRepository
  //       .createQueryBuilder('student')
  //       .where('student.id_exam_query=:id', {
  //         id,
  //       })
  //       .andWhere(
  //         'student.point_end > :scoreStart AND student.point_end <= :scoreEnd',
  //         {
  //           scoreStart: scoreStart,
  //           scoreEnd: scoreEnd,
  //         },
  //       )
  //       .orWhere(
  //         'student.point_end > :scoreStart AND student.point_end_end <= :scoreEnd',
  //         {
  //           scoreStart: scoreStart,
  //           scoreEnd: scoreEnd,
  //         },
  //       )
  //       .getCount();
  //     return data;
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 'error',
  //       message: 'server error',
  //     });
  //   }
  // }
  // async findOneCountScoreStudentOne(id: number, res: any) {
  //   try {
  //     return await this.studentRepository
  //       .createQueryBuilder('student')
  //       .where('student.id_exam_query=:id', {
  //         id,
  //       })
  //       .andWhere('student.point_end >= :scoreStart', {
  //         scoreStart: 0,
  //       })
  //       .andWhere('student.point_end <= :scoreEnd', { scoreEnd: 1 })
  //       .orWhere('student.point_end_end <= :scoreEnd', {
  //         scoreStart: 0,
  //       })
  //       .getCount();
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 'error',
  //       message: 'server error',
  //     });
  //   }
  // }

  dataArray0 = (array, score, score_start, score_end) => {
    if (score_start == 0 && score <= score_end && score >= score_start) {
      array[0] = array[0] + 1
    }
    return array;
  }

  dataArray = (array, score, score_start, score_end) => {
    if (score <= score_end && score > score_start) {
      array[score_start] = array[score_start] + 1
    }
    return array;
  }

  async ttScoreStudent(data: any, res: any) {
    const { time_start, id_exam_where } = data;
    try {
      const dataQuery: any = await this.examBigClassRepository.findOneData({
        id_exam_where: id_exam_where,
        time_year_start: time_start,
      });
      if (!time_start || !id_exam_where) {
        return res.status(500).json({
          status: 'error',
          message: 'Cần chọn đủ môn thi và năm thi',
        });
      }

      if (!dataQuery) {
        return res.status(500).json({
          status: 'error',
          message: 'Chưa có điểm môn thi này',
        });
      }
      const { id: idQuery } = dataQuery;
      const dataFindScore = await this.findOneScore(idQuery, res);
      if (!dataFindScore) {
        return res.status(500).json({
          status: 'error',
          message: 'Chưa có điểm môn thi này',
        });
      }

      let dataAll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const findAllData = await this.studentRepository.findBy({
        id_exam_query: idQuery
      });

      findAllData.map((item: any) => {
        let scoreStusentEnd = Number(item.point_end)
        let scoreStudentEndEnd = Number(item.point_end_end)
        if (item.point_end_end != -1) {
          dataAll = this.dataArray0(dataAll, scoreStudentEndEnd, 0, 1)
          for (let i = 1; i < 10; i++) {
            dataAll = this.dataArray(dataAll, scoreStudentEndEnd, i, i + 1)
          }
        } else if (item.point_end_end == -1) {
          dataAll = this.dataArray0(dataAll, scoreStusentEnd, 0, 1)
          for (let i = 1; i < 10; i++) {
            dataAll = this.dataArray(dataAll, scoreStusentEnd, i, i + 1)
          }
        }
      })

      return res.status(200).json({
        status: 'success',
        message: dataAll,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'server error',
      });
    }
  }

  async countStudent(exam: string, time_start: string, res: any) {
    try {
      const dataQuery: any = await this.examBigClassRepository.findOneData({
        id_exam_where: exam,
        time_year_start: time_start,
      });
      if (!dataQuery) {
        return res.status(200).json({
          status: 'success',
          message:0,
        });
      }
      const countFind = await this.studentRepository.count({
        where: {
          id_exam_query: dataQuery.id
        }
      })
      console.log(countFind)
      return res.status(200).json({
        status: 'success',
        message: countFind,
      })

    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'server error',
      });
    }

  }
}
