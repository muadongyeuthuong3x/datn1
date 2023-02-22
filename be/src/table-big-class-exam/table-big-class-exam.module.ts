import { Module } from '@nestjs/common';
import { TableBigClassExamService } from './table-big-class-exam.service';
import { TableBigClassExamController } from './table-big-class-exam.controller';

@Module({
  controllers: [TableBigClassExamController],
  providers: [TableBigClassExamService]
})
export class TableBigClassExamModule {}
