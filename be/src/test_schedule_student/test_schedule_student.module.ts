import { forwardRef, Module } from '@nestjs/common';
import { TestScheduleStudentService } from './test_schedule_student.service';
import { TestScheduleStudentController } from './test_schedule_student.controller';
import { TableExamBigBlockClassService } from 'src/table_exam_big_block_class/table_exam_big_block_class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { TestScheduleStudent } from './entities/test_schedule_student.entity';
import { TableExamBigBlockClassModule } from 'src/table_exam_big_block_class/table_exam_big_block_class.module';
import { TableExamBigBlockClassController } from 'src/table_exam_big_block_class/table_exam_big_block_class.controller';
import { TableBigClassExamService } from 'src/table-big-class-exam/table-big-class-exam.service';
import { TableBigClassExamModule } from 'src/table-big-class-exam/table-big-class-exam.module';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';
import { TableBigClassExamController } from 'src/table-big-class-exam/table-big-class-exam.controller';
import { ItemRoomExamAndTeacherModule } from 'src/item-room-exam-and-teacher/item-room-exam-and-teacher.module';
import { ItemRoomExamAndTeacherService } from 'src/item-room-exam-and-teacher/item-room-exam-and-teacher.service';
import { ClassModule } from 'src/class/class.module';
import { ClassController } from 'src/class/class.controller';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/entities/class.entity';
import { ItemRoomExamAndTeacherController } from 'src/item-room-exam-and-teacher/item-room-exam-and-teacher.controller';
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { TeacherTrackService } from 'src/teacher_track/teacher_track.service';
import { TeacherMarkExamRoomService } from 'src/teacher_mark_exam_room/teacher_mark_exam_room.service';
import { TeacherTrackModule } from 'src/teacher_track/teacher_track.module';
import { TeacherMarkExamRoomModule } from 'src/teacher_mark_exam_room/teacher_mark_exam_room.module';
import { TeacherTrack } from 'src/teacher_track/entities/teacher_track.entity';
import { TeacherMarkExamRoom } from 'src/teacher_mark_exam_room/entities/teacher_mark_exam_room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestScheduleStudent , TableExamBigBlockClass , TableBigClassExam , Class,ItemRoomExamAndTeacher , TeacherTrack , TeacherMarkExamRoom ]),
    TableExamBigBlockClassModule,
    TableBigClassExamModule,
    ItemRoomExamAndTeacherModule,
    ClassModule,
    TeacherTrackModule,
    TeacherMarkExamRoomModule
  ],
  controllers: [TestScheduleStudentController ,TableExamBigBlockClassController, TableBigClassExamController  , ClassController , ItemRoomExamAndTeacherController],
  providers: [TestScheduleStudentService ,TableExamBigBlockClassService,TableBigClassExamService  ,ItemRoomExamAndTeacherService , ClassService,TeacherTrackService , TeacherMarkExamRoomService]
})
export class TestScheduleStudentModule {}
