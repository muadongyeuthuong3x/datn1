import { BadGatewayException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from 'src/room/room.service';
import { StudentsService } from 'src/students/students.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { TeacherMarkExamRoomService } from 'src/teacher_mark_exam_room/teacher_mark_exam_room.service';
import { TeacherTrack } from 'src/teacher_track/entities/teacher_track.entity';
import { TeacherTrackService } from 'src/teacher_track/teacher_track.service';
import { TestScheduleStudentService } from 'src/test_schedule_student/test_schedule_student.service';
import {  Repository } from 'typeorm';
import { CreateItemRoomExamAndTeacherDto } from './dto/create-item-room-exam-and-teacher.dto';
import { UpdateItemRoomExamAndTeacherDto } from './dto/update-item-room-exam-and-teacher.dto';
import { ItemRoomExamAndTeacher } from './entities/item-room-exam-and-teacher.entity';

@Injectable()
export class ItemRoomExamAndTeacherService {
  constructor(
    @InjectRepository(ItemRoomExamAndTeacher)
    @Inject(forwardRef(() => TestScheduleStudentService))
    @Inject(forwardRef(() => TeacherTrackService))
    @Inject(forwardRef(() => RoomService))
    private readonly itemRoomExamAndTeacherRepository: Repository<ItemRoomExamAndTeacher>,
    private readonly teacherTrackRepository: TeacherTrackService,
    private readonly teacherMarkExamRoomRepository: TeacherMarkExamRoomService,
    private readonly studentRepository: StudentsService,
    private readonly teacherS : TeacherService,
    private readonly rooms : RoomService,
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

  async findStudentByRoom(id : number){
    await this.studentRepository.findStudent(id);
  }

  async findListTeachers(time_start : Date , time_end : Date , idUnLess : number[]){
    const arrayIdTeacherUnLess = []
    const data : any = await this.itemRoomExamAndTeacherRepository.createQueryBuilder('item-room-exam-and-teacher')
    .select([
      'item-room-exam-and-teacher.id',
      'teacher-track.id_teacher_track_query',
    ])
    .where('item-room-exam-and-teacher.time_start BETWEEN :startDate AND :endDate')
    .orWhere('item-room-exam-and-teacher.time_end BETWEEN :startDate AND :endDate')
    .innerJoin('item-room-exam-and-teacher.id_teacherTrack', 'teacher-track')
    .setParameters({
      startDate: new Date(time_start),
      endDate: new Date(time_end),
    })
    .getMany();
    for(let i = 0 ; i < data.length ; i ++){
      for(let j = 0 ; j < data[i]?.id_teacherTrack.length ; j ++){
      arrayIdTeacherUnLess.push(Number(data[i].id_teacherTrack[j].id_teacher_track_query));
      }
    }
    const dataUnLess =arrayIdTeacherUnLess.concat(idUnLess);
    const listTeachers = await this.teacherS.findTeacherExam(dataUnLess)
    return listTeachers;

  }


  async findListRooms(time_start : Date , time_end : Date , idUnLess : number[]){
    const arrayIdTeacherUnLess = []
    const data : any = await this.itemRoomExamAndTeacherRepository.createQueryBuilder('item-room-exam-and-teacher')
    .select([
      'item-room-exam-and-teacher.id',
      'item-room-exam-and-teacher.id_class_query',
    ])
    .where('item-room-exam-and-teacher.time_start BETWEEN :startDate AND :endDate')
    .orWhere('item-room-exam-and-teacher.time_end BETWEEN :startDate AND :endDate')
    .setParameters({
      startDate: new Date(time_start),
      endDate: new Date(time_end),
    })
    .getMany();
   
    for(let i = 0 ; i < data.length ; i ++){
      arrayIdTeacherUnLess.push(Number(data[i].id_class_query));
    }
    const dataUnLess =arrayIdTeacherUnLess.concat(idUnLess);
    const rooms = await this.rooms.findRoomExam(dataUnLess)
    return rooms;

  }
  
  async findListExitRoomOrTeacherByTime(dataProps: any, res: any) {
    const { time_start_exam,
      time_end_exam,
      room_exam,
      teacher_exam } = dataProps;

    const data: any = await this.itemRoomExamAndTeacherRepository.createQueryBuilder('item-room-exam-and-teacher')
      .select([
        'item-room-exam-and-teacher.id',
        'item-room-exam-and-teacher.id_class_query',
        'teacher-track',
        'teacher.name',
      ])
      .where('item-room-exam-and-teacher.time_start BETWEEN :startDate AND :endDate')
      .orWhere('item-room-exam-and-teacher.time_end BETWEEN :startDate AND :endDate')
      .innerJoin('item-room-exam-and-teacher.id_teacherTrack', 'teacher-track')
      .innerJoin('teacher-track.id_Teacher', 'teacher')
      .setParameters({
        startDate: new Date(time_start_exam),
        endDate: new Date(time_end_exam),
      })
      .getMany();

      const objectCheck = {
        name_teacher : '',
        room_name: ''
      }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i]?.id_teacherTrack.length; j++) {
        if (teacher_exam.includes(Number(data[i].id_teacherTrack[j].id_teacher_track_query))) {
          objectCheck.name_teacher = data[i].id_teacherTrack[j].id_Teacher.name;
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      //room_exam
      if(data[i].id_class_query == room_exam){
       const data : any =  await this.rooms.findOne(room_exam);
       objectCheck.room_name = data.name;
      }
    }
     return objectCheck;
  }
}
