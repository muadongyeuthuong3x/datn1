import { Module } from '@nestjs/common';
import { StudentTestService } from './student_test.service';
import { StudentTestController } from './student_test.controller';

@Module({
  controllers: [StudentTestController],
  providers: [StudentTestService]
})
export class StudentTestModule {}
