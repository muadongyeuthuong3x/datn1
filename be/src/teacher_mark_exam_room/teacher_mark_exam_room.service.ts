import { Injectable } from '@nestjs/common';
import { CreateTeacherMarkExamRoomDto } from './dto/create-teacher_mark_exam_room.dto';
import { UpdateTeacherMarkExamRoomDto } from './dto/update-teacher_mark_exam_room.dto';

@Injectable()
export class TeacherMarkExamRoomService {
  create(createTeacherMarkExamRoomDto: CreateTeacherMarkExamRoomDto) {
    return 'This action adds a new teacherMarkExamRoom';
  }

  findAll() {
    return `This action returns all teacherMarkExamRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherMarkExamRoom`;
  }

  update(id: number, updateTeacherMarkExamRoomDto: UpdateTeacherMarkExamRoomDto) {
    return `This action updates a #${id} teacherMarkExamRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherMarkExamRoom`;
  }
}
