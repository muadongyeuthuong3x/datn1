import { forwardRef, Module } from '@nestjs/common';
import { ItemRoomExamAndTeacherService } from './item-room-exam-and-teacher.service';
import { ItemRoomExamAndTeacherController } from './item-room-exam-and-teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRoomExamAndTeacher } from './entities/item-room-exam-and-teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { ClassModule } from 'src/class/class.module';
import { ClassController } from 'src/class/class.controller';
import { ClassService } from 'src/class/class.service';
import { TestScheduleStudentModule } from 'src/test_schedule_student/test_schedule_student.module';
import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import { TestScheduleStudentController } from 'src/test_schedule_student/test_schedule_student.controller';
import { TestScheduleStudentService } from 'src/test_schedule_student/test_schedule_student.service';
import { TableBigClassExamService } from 'src/table-big-class-exam/table-big-class-exam.service';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { TableExamBigBlockClassService } from 'src/table_exam_big_block_class/table_exam_big_block_class.service';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';
import { TableExamBigBlockClassModule } from 'src/table_exam_big_block_class/table_exam_big_block_class.module';
import { TableBigClassExamModule } from 'src/table-big-class-exam/table-big-class-exam.module';
import { TeacherMarkExamRoomModule } from 'src/teacher_mark_exam_room/teacher_mark_exam_room.module';
import { TeacherMarkExamRoomService } from 'src/teacher_mark_exam_room/teacher_mark_exam_room.service';
import { TeacherTrackService } from 'src/teacher_track/teacher_track.service';
import { TeacherTrackModule } from 'src/teacher_track/teacher_track.module';
import { TeacherTrack } from 'src/teacher_track/entities/teacher_track.entity';
import { TeacherMarkExamRoom } from 'src/teacher_mark_exam_room/entities/teacher_mark_exam_room.entity';
import { StudentsModule } from 'src/students/students.module';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { RoomModule } from 'src/room/room.module';
import { Room } from 'src/room/entities/room.entity';
import { RoomService } from 'src/room/room.service';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRoomExamAndTeacher ,TestScheduleStudent, Class ,  TableExamBigBlockClass , TableBigClassExam , Class, TeacherTrack , TeacherMarkExamRoom , Student , Teacher ,Room]),
    ClassModule,
    TableExamBigBlockClassModule,
    TableBigClassExamModule,
    ItemRoomExamAndTeacherModule,
    TeacherTrackModule,
    TeacherMarkExamRoomModule,
    ClassModule,
    StudentsModule,
    TeacherModule,
    RoomModule
  ],
  controllers: [ItemRoomExamAndTeacherController , ClassController ],
  providers: [ItemRoomExamAndTeacherService , ClassService, TestScheduleStudentService, TableExamBigBlockClassService, TableBigClassExamService, TeacherMarkExamRoomService, TeacherTrackService , TeacherMarkExamRoomService , StudentsService , TeacherService , RoomService]
})
export class ItemRoomExamAndTeacherModule {}
