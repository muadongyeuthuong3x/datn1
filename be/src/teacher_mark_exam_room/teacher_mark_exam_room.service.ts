import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherMarkExamRoomDto } from './dto/create-teacher_mark_exam_room.dto';
import { UpdateTeacherMarkExamRoomDto } from './dto/update-teacher_mark_exam_room.dto';
import { TeacherMarkExamRoom } from './entities/teacher_mark_exam_room.entity';

@Injectable()
export class TeacherMarkExamRoomService {

  constructor(
    @InjectRepository(TeacherMarkExamRoom)
    private readonly teacherMarkExamRoomRepository: Repository<TeacherMarkExamRoom>,
  ) { }
  async create(createTeacherMarkExamRoomDto: CreateTeacherMarkExamRoomDto) {
    try {
      // for (let i = 0; i < createTeacherMarkExamRoomDto.list_teacher.length; i++) {
        const createData = new TeacherMarkExamRoom();
        createData.id_item_room_exam =createTeacherMarkExamRoomDto.idDataCreate;
        createData.id_teacher_mark_score =createTeacherMarkExamRoomDto.teacher;   
        return  await this.teacherMarkExamRoomRepository.save(createData); 
      // }
    } catch (error) {
      
    }
  
   
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