import { Module } from '@nestjs/common';
import { TestScheduleStudentService } from './test_schedule_student.service';
import { TestScheduleStudentController } from './test_schedule_student.controller';

@Module({
  controllers: [TestScheduleStudentController],
  providers: [TestScheduleStudentService]
})
export class TestScheduleStudentModule {}
