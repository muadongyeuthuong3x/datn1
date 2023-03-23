import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherMarkExamRoomService } from 'src/teacher_mark_exam_room/teacher_mark_exam_room.service';
import { TeacherTrack } from 'src/teacher_track/entities/teacher_track.entity';
import { TeacherTrackService } from 'src/teacher_track/teacher_track.service';
import { TestScheduleStudentService } from 'src/test_schedule_student/test_schedule_student.service';
import { Repository } from 'typeorm';
import { CreateItemRoomExamAndTeacherDto } from './dto/create-item-room-exam-and-teacher.dto';
import { UpdateItemRoomExamAndTeacherDto } from './dto/update-item-room-exam-and-teacher.dto';
import { ItemRoomExamAndTeacher } from './entities/item-room-exam-and-teacher.entity';

@Injectable()
export class ItemRoomExamAndTeacherService {
  constructor(
    @InjectRepository(ItemRoomExamAndTeacher)
    @Inject(forwardRef(() => TestScheduleStudentService))
    @Inject(forwardRef(() => TeacherTrackService))
    private readonly itemRoomExamAndTeacherRepository: Repository<ItemRoomExamAndTeacher>,
    private readonly teacherTrackRepository: TeacherTrackService,
    private readonly teacherMarkExamRoomRepository: TeacherMarkExamRoomService,
  ) { }

  async create(createItemRoomExamAndTeacherDto: CreateItemRoomExamAndTeacherDto) {
    const { id_query_test_schedule_student , roomExamAndTeacher, mode }  = createItemRoomExamAndTeacherDto;
     for(let i = 0 ; i < roomExamAndTeacher.length ; i++){
      let newDataItemRoomExamAndTeacher = new ItemRoomExamAndTeacher();
      newDataItemRoomExamAndTeacher.id_testScheduleStudent = id_query_test_schedule_student;
      newDataItemRoomExamAndTeacher.time_start = roomExamAndTeacher[i].time_start_exam;
      newDataItemRoomExamAndTeacher.time_end = roomExamAndTeacher[i].time_end_exam;
      newDataItemRoomExamAndTeacher.id_class_query = roomExamAndTeacher[i].room_exam;
      const dataCreate = await this.itemRoomExamAndTeacherRepository.save(newDataItemRoomExamAndTeacher);
      const idDataCreate : number = dataCreate.id;
      await this.teacherTrackRepository.create({idDataCreate , list_teacher : roomExamAndTeacher[i].teacher_exam})
      if(mode == 2 ){
        await this.teacherMarkExamRoomRepository.create({idDataCreate , list_teacher : roomExamAndTeacher[i].teacher_score_student})
      }
     }
  }

  findAll() {
    return `This action returns all itemRoomExamAndTeacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemRoomExamAndTeacher`;
  }

  update(id: number, updateItemRoomExamAndTeacherDto: UpdateItemRoomExamAndTeacherDto) {
    return `This action updates a #${id} itemRoomExamAndTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemRoomExamAndTeacher`;
  }
}
