import { CacheModule, Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule { }
