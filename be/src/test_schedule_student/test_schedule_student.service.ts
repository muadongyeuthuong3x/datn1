import { Injectable } from '@nestjs/common';
import { CreateTestScheduleStudentDto } from './dto/create-test_schedule_student.dto';
import { UpdateTestScheduleStudentDto } from './dto/update-test_schedule_student.dto';

@Injectable()
export class TestScheduleStudentService {
  create(createTestScheduleStudentDto: CreateTestScheduleStudentDto) {
    return 'This action adds a new testScheduleStudent';
  }

  findAll() {
    return `This action returns all testScheduleStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testScheduleStudent`;
  }

  update(id: number, updateTestScheduleStudentDto: UpdateTestScheduleStudentDto) {
    return `This action updates a #${id} testScheduleStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} testScheduleStudent`;
  }
}
