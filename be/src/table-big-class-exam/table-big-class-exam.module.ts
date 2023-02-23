import { CacheModule, Module } from '@nestjs/common';
import { TableBigClassExamService } from './table-big-class-exam.service';
import { TableBigClassExamController } from './table-big-class-exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TableBigClassExam} from './entities/table-big-class-exam.entity'
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
import { BigBlockClassController } from 'src/big_block_class/big_block_class.controller';
import { BigBlockClassService } from 'src/big_block_class/big_block_class.service';
import { BigBlockClassModule } from 'src/big_block_class/big_block_class.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TableBigClassExam]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [TableBigClassExamController ],
  providers: [TableBigClassExamService ]
})
export class TableBigClassExamModule {}
