import { Injectable } from '@nestjs/common';
import { CreateTableRoomStudentDto } from './dto/create-table_room_student.dto';
import { UpdateTableRoomStudentDto } from './dto/update-table_room_student.dto';

@Injectable()
export class TableRoomStudentService {
  create(createTableRoomStudentDto: CreateTableRoomStudentDto) {
    return 'This action adds a new tableRoomStudent';
  }

  findAll() {
    return `This action returns all tableRoomStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tableRoomStudent`;
  }

  update(id: number, updateTableRoomStudentDto: UpdateTableRoomStudentDto) {
    return `This action updates a #${id} tableRoomStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableRoomStudent`;
  }
}
