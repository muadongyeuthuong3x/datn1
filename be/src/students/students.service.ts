import { BadGatewayException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Class } from 'src/class/entities/class.entity';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student)
    @Inject(forwardRef(() => ClassService))
    private readonly studentRepository: Repository<Student>,
    private readonly classService: ClassService,
    private dataSource: DataSource
  ) { }


  async create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
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
        status: "error",
        message: "server error"
      })
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  importCSV(array: any, callBack: any) {
    for (let i = 0; i < array.length; i++) {
      let newStudnet = new Student();
      const { name, code_student } = array[i]
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

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
