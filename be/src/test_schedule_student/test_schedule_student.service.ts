import { BadGatewayException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRoomExamAndTeacherService } from 'src/item-room-exam-and-teacher/item-room-exam-and-teacher.service';
import { TableBigClassExamService } from 'src/table-big-class-exam/table-big-class-exam.service';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { TableExamBigBlockClassService } from 'src/table_exam_big_block_class/table_exam_big_block_class.service';
import { Repository } from 'typeorm';
import { CreateTestScheduleStudentDto } from './dto/create-test_schedule_student.dto';
import { UpdateTestScheduleStudentDto } from './dto/update-test_schedule_student.dto';
import { TestScheduleStudent } from './entities/test_schedule_student.entity';
const fs = require("fs");
const PDFDocument = require("pdfkit-table"); 

@Injectable()
export class TestScheduleStudentService {

  constructor(
    @InjectRepository(TestScheduleStudent)
    // @Injectable()
    @Inject(forwardRef(() => TableExamBigBlockClassService))
    @Inject(forwardRef(() => ItemRoomExamAndTeacherService))

    private readonly testScheduleStudentRepository: Repository<TestScheduleStudent>,
    private readonly tableExamBigBlockClassServiceRepository: TableExamBigBlockClassService,
    private readonly itemRoomExamAndTeacherRepository: ItemRoomExamAndTeacherService,
  ) { }

  async create(createTestScheduleStudentDto: CreateTestScheduleStudentDto, res: any) {
    const { roomPeopleMax, mode, timeYearExamStart, id_exam, form_exam, time_exam, roomExamAndTeacher } = createTestScheduleStudentDto;
    const newTestSchedule = new TestScheduleStudent();
    const data = await this.tableExamBigBlockClassServiceRepository.findOneData({ id_exam_where: id_exam, time_year_start: timeYearExamStart });
    const dataCheck = await this.checkFindExitsExam((data.id).toString())
    if (dataCheck != null && mode == dataCheck?.mode) {
      return res.status(500).json({
        status: "error",
        message: "Môn thi này đã được lên lịch"
      })
    }

    let objectCheck = {
      name_teacher : '',
      room_name: ''
    }

     objectCheck  = await this.itemRoomExamAndTeacherRepository.findListExitRoomOrTeacherByTime(createTestScheduleStudentDto ,res );

    if(objectCheck.name_teacher.length > 0) {
      return res.status(500).json({
        status: "error",
        message: `Giáo viên ${objectCheck.name_teacher} đã có lịch thi trong thời gian thi`
      })
    }
    if(objectCheck.room_name.length > 0) {
      return res.status(500).json({
        status: "error",
        message: `Phòng ${objectCheck.room_name} đã lên lịch  trong thời gian thi`
      })
    }

    newTestSchedule.id_query_exam_big_class = (data.id).toString();
    newTestSchedule.roomPeopleMax = roomPeopleMax;
    newTestSchedule.time_exam = time_exam;
    newTestSchedule.mode = mode;
    newTestSchedule.form_exam = form_exam;
    newTestSchedule.id_tableExamBigBlockClass = data;
    const dataCrete = await this.testScheduleStudentRepository.save(newTestSchedule);
    const dataItemExam = {
      id_query_test_schedule_student: dataCrete,
      roomExamAndTeacher,
      mode,
      id_exam_big_class: data.id,
      roomPeopleMax: Number(roomPeopleMax)
    }
    await this.itemRoomExamAndTeacherRepository.create(dataItemExam);
    return res.status(200).json({
      status: "success",
      message: "Tạo thành công"
    })

  }

  async checkFindExitsExam(idFind: string) {
    return await this.testScheduleStudentRepository.findOne({
      where: {
        id_query_exam_big_class: idFind
      }
    })
  }

  async findAll(res: any) {
    return await this.tableExamBigBlockClassServiceRepository.findAllTestScheduleStudent(res);
  }

  findOne(id: number) {
    return `This action returns a #${id} testScheduleStudent`;
  }

  update(id: number, updateTestScheduleStudentDto: UpdateTestScheduleStudentDto) {
    return `This action updates a #${id} testScheduleStudent`;
  }

  async remove(id: number ,res : any) {
    try {
      const dataAll = await this.testScheduleStudentRepository.delete(id);
      return res.status(200).json({
        status: "success",
        message: "Xóa thành công"
      })
    } catch (error) {
      return res.status(200).json({
        status: "error",
        message: "Server error"
      })
    }  
  }

  async exportPDf(dataPdf: { id : number , subject : string , mode : number , blokcclass : string ; form_exam : string  }) {
    const {id , subject , mode , blokcclass , form_exam} = dataPdf;
    console.log(subject , mode , blokcclass , form_exam)
    try {
      const data: any = await this.testScheduleStudentRepository.find({
        where: {
          id: id
        },
        relations: {
          id_itemRoomExamAndTeacher: {
            id_Room : true
          }

        }
      },
      )
      const arrayIdRoom = [];
      for (let index = 0; index < data[0].id_itemRoomExamAndTeacher.length; index++) {
        const id = data[0].id_itemRoomExamAndTeacher[index].id;
        arrayIdRoom.push({
          id: id,
          room : data[0].id_itemRoomExamAndTeacher[index].id_Room.name,
          time : data[0].time_exam,
          time_start :  data[0].id_itemRoomExamAndTeacher[index].time_start ,
          time_end :  data[0].id_itemRoomExamAndTeacher[index].time_end,
          listStudent : [],
        });
      } 
      for (let index = 0; index < arrayIdRoom.length; index++) {
      const data = await this.itemRoomExamAndTeacherRepository.findStudentByRoom(arrayIdRoom[index].id)
        arrayIdRoom[index].listStudent = data;
      }
      console.log(arrayIdRoom)
    } catch (error) {
      console.log(error)
      throw new BadGatewayException({
        status: 'error',
        message: 'Server error ',
      });
    }
  }

  async findListTeacherByTime ( time_start : Date , time_end : Date ,idUnLess : number []){
  return  await this.itemRoomExamAndTeacherRepository.findListTeachers(time_start , time_end ,idUnLess);
  }

  async findListRoomsByTime ( time_start : Date , time_end : Date ,idUnLess : number []){
    return  await this.itemRoomExamAndTeacherRepository.findListRooms(time_start , time_end ,idUnLess);
    }

    async dowloadPDFSchedule (id : number) : Promise<Buffer> {
      
      const pdfBuffer: Buffer = await new Promise( resolve =>{
        const doc = new PDFDocument({ margin: 30, size: 'A4' });

        doc.text("PDF GENNER en nues")
        doc.moveDown();
        doc.text("PDF GENNER en nues2222222222222222222")
        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end' , () => {
          const data = Buffer.concat(buffer);
          resolve(data)
        })
        doc.end();
      })
      
      return pdfBuffer;
      // todo

      
    }
}
