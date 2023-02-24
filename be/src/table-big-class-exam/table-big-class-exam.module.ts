import { CacheModule, Module } from '@nestjs/common';
import { TableBigClassExamService } from './table-big-class-exam.service';
import { TableBigClassExamController } from './table-big-class-exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableBigClassExam } from './entities/table-big-class-exam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableBigClassExam]),
    CacheModule.register({
      ttl: 30000,
    }),
  ],
  controllers: [TableBigClassExamController],
  providers: [TableBigClassExamService],
})
export class TableBigClassExamModule {}
