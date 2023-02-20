import { CacheModule, Module } from '@nestjs/common';
import { ExamFormService } from './exam_form.service';
import { ExamFormController } from './exam_form.controller';
import { ExamForm } from './entities/exam_form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamForm]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [ExamFormController],
  providers: [ExamFormService]
})
export class ExamFormModule { }
