import { CacheModule, Module } from '@nestjs/common';
import { TableExamBigBlockClassService } from './table_exam_big_block_class.service';
import { TableExamBigBlockClassController } from './table_exam_big_block_class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableExamBigBlockClass } from './entities/table_exam_big_block_class.entity';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';
import { TableBigClassExamController } from 'src/table-big-class-exam/table-big-class-exam.controller';
import { TableBigClassExamService } from 'src/table-big-class-exam/table-big-class-exam.service';
import { TableBigClassExamModule } from 'src/table-big-class-exam/table-big-class-exam.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableExamBigBlockClass, TableBigClassExam]),
    TableBigClassExamModule,
    

  ],
  controllers: [TableExamBigBlockClassController, TableBigClassExamController],
  providers: [TableExamBigBlockClassService, TableBigClassExamService],

})
export class TableExamBigBlockClassModule { }
