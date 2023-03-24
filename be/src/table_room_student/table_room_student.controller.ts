import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableRoomStudentService } from './table_room_student.service';
import { CreateTableRoomStudentDto } from './dto/create-table_room_student.dto';
import { UpdateTableRoomStudentDto } from './dto/update-table_room_student.dto';

@Controller('table-room-student')
export class TableRoomStudentController {
  constructor(private readonly tableRoomStudentService: TableRoomStudentService) {}

  @Post()
  create(@Body() createTableRoomStudentDto: CreateTableRoomStudentDto) {
    return this.tableRoomStudentService.create(createTableRoomStudentDto);
  }

  @Get()
  findAll() {
    return this.tableRoomStudentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableRoomStudentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableRoomStudentDto: UpdateTableRoomStudentDto) {
    return this.tableRoomStudentService.update(+id, updateTableRoomStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableRoomStudentService.remove(+id);
  }
}
