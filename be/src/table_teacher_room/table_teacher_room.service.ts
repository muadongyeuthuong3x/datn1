import { Injectable } from '@nestjs/common';
import { CreateTableTeacherRoomDto } from './dto/create-table_teacher_room.dto';
import { UpdateTableTeacherRoomDto } from './dto/update-table_teacher_room.dto';

@Injectable()
export class TableTeacherRoomService {
  create(createTableTeacherRoomDto: CreateTableTeacherRoomDto) {
    return 'This action adds a new tableTeacherRoom';
  }

  findAll() {
    return `This action returns all tableTeacherRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tableTeacherRoom`;
  }

  update(id: number, updateTableTeacherRoomDto: UpdateTableTeacherRoomDto) {
    return `This action updates a #${id} tableTeacherRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableTeacherRoom`;
  }
}
