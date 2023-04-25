import { PartialType } from '@nestjs/swagger';
import { CreateTestScheduleStudentDto } from './create-test_schedule_student.dto';

export class UpdateTestScheduleStudentDto extends PartialType(
  CreateTestScheduleStudentDto,
) {}
