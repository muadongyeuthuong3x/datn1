import { Injectable } from '@nestjs/common';
import { CreateItemRoomExamAndTeacherDto } from './dto/create-item-room-exam-and-teacher.dto';
import { UpdateItemRoomExamAndTeacherDto } from './dto/update-item-room-exam-and-teacher.dto';

@Injectable()
export class ItemRoomExamAndTeacherService {
  create(createItemRoomExamAndTeacherDto: CreateItemRoomExamAndTeacherDto) {
    return 'This action adds a new itemRoomExamAndTeacher';
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
