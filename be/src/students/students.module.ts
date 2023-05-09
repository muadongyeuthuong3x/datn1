import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
import { Student } from './entities/student.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { TableBigClassExamController } from 'src/table-big-class-exam/table-big-class-exam.controller';
import { TableExamBigBlockClassService } from 'src/table_exam_big_block_class/table_exam_big_block_class.service';
import { TableBigClassExamService } from 'src/table-big-class-exam/table-big-class-exam.service';
import { TableExamBigBlockClassController } from 'src/table_exam_big_block_class/table_exam_big_block_class.controller';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      TableBigClassExam,
      TableExamBigBlockClass,
    ]),
    CsvModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [
    StudentsController,
    TableBigClassExamController,
    TableExamBigBlockClassController,
  ],
  providers: [
    StudentsService,
    TableExamBigBlockClassService,
    TableBigClassExamService,
  ],
})
export class StudentsModule {}
