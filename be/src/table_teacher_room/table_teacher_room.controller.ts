import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableTeacherRoomService } from './table_teacher_room.service';
import { CreateTableTeacherRoomDto } from './dto/create-table_teacher_room.dto';
import { UpdateTableTeacherRoomDto } from './dto/update-table_teacher_room.dto';

@Controller('table-teacher-room')
export class TableTeacherRoomController {
  constructor(private readonly tableTeacherRoomService: TableTeacherRoomService) {}

  @Post()
  create(@Body() createTableTeacherRoomDto: CreateTableTeacherRoomDto) {
    return this.tableTeacherRoomService.create(createTableTeacherRoomDto);
  }

  @Get()
  findAll() {
    return this.tableTeacherRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableTeacherRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableTeacherRoomDto: UpdateTableTeacherRoomDto) {
    return this.tableTeacherRoomService.update(+id, updateTableTeacherRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableTeacherRoomService.remove(+id);
  }
}
