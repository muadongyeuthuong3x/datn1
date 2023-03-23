import { Module } from '@nestjs/common';
import { TeacherMarkExamRoomService } from './teacher_mark_exam_room.service';
import { TeacherMarkExamRoomController } from './teacher_mark_exam_room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from 'src/teacher/teacher.module';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherMarkExamRoom } from './entities/teacher_mark_exam_room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher ,TeacherMarkExamRoom]),
     TeacherModule
  ],
  controllers: [TeacherMarkExamRoomController],
  providers: [TeacherMarkExamRoomService]
})
export class TeacherMarkExamRoomModule {}
