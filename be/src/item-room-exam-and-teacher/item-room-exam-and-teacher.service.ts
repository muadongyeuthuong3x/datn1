import { BadGatewayException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsService } from 'src/students/students.service';
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
    private readonly studentRepository: StudentsService,
  ) { }

  async create(createItemRoomExamAndTeacherDto: CreateItemRoomExamAndTeacherDto) {
    const { id_query_test_schedule_student, roomExamAndTeacher, mode, id_exam_big_class, roomPeopleMax } = createItemRoomExamAndTeacherDto;
    try {
      for (let i = 0; i < roomExamAndTeacher.length; i++) {
        let newDataItemRoomExamAndTeacher = new ItemRoomExamAndTeacher();
        newDataItemRoomExamAndTeacher.id_testScheduleStudent = id_query_test_schedule_student;
        newDataItemRoomExamAndTeacher.time_start = roomExamAndTeacher[i].time_start_exam;
        newDataItemRoomExamAndTeacher.time_end = roomExamAndTeacher[i].time_end_exam;
        newDataItemRoomExamAndTeacher.id_class_query = roomExamAndTeacher[i].room_exam;
        newDataItemRoomExamAndTeacher.id_Room = roomExamAndTeacher[i].room_exam as any;
        const dataArrrayId = await this.studentRepository.findIdGetExamBigClass(id_exam_big_class);
        let arrayIdUpdate = [];
        let vtStart = (i ==0) ? 0 : i*Number(roomPeopleMax);
        let vtEnd =  (vtStart + Number(roomPeopleMax)  < dataArrrayId.length ) ? vtStart + Number(roomPeopleMax) : dataArrrayId.length;
        for (let k = vtStart ; k < vtEnd ; k++) {
          arrayIdUpdate.push(dataArrrayId[k].id)
        }
        const dataCreate = await this.itemRoomExamAndTeacherRepository.save(newDataItemRoomExamAndTeacher);
        await this.studentRepository.updateIdRoomTest(arrayIdUpdate , dataCreate.id);
        arrayIdUpdate= [];
        const idDataCreate : number = dataCreate.id;
        await this.teacherTrackRepository.create({idDataCreate , list_teacher : roomExamAndTeacher[i].teacher_exam})
        if( mode == 1 ){
          await this.teacherMarkExamRoomRepository.create({idDataCreate , teacher : roomExamAndTeacher[i].teacher_score_student}) 
        }
      }
    } catch (error) {
      console.log(error)
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

  async remove(id: number) {
 
  }
}
