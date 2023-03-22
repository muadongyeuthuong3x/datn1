import { Module } from '@nestjs/common';
import { TeacherMarkExamRoomService } from './teacher_mark_exam_room.service';
import { TeacherMarkExamRoomController } from './teacher_mark_exam_room.controller';

@Module({
  controllers: [TeacherMarkExamRoomController],
  providers: [TeacherMarkExamRoomService]
})
export class TeacherMarkExamRoomModule {}
