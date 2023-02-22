import { CacheModule, Module } from '@nestjs/common';
import { TableExamBigBlockClassService } from './table_exam_big_block_class.service';
import { TableExamBigBlockClassController } from './table_exam_big_block_class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableExamBigBlockClass } from './entities/table_exam_big_block_class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableExamBigBlockClass]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [TableExamBigBlockClassController],
  providers: [TableExamBigBlockClassService]
})
export class TableExamBigBlockClassModule { }
