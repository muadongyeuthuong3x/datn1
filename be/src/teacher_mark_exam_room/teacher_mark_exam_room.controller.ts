import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherMarkExamRoomService } from './teacher_mark_exam_room.service';
import { CreateTeacherMarkExamRoomDto } from './dto/create-teacher_mark_exam_room.dto';
import { UpdateTeacherMarkExamRoomDto } from './dto/update-teacher_mark_exam_room.dto';

@Controller('teacher-mark-exam-room')
export class TeacherMarkExamRoomController {
  constructor(private readonly teacherMarkExamRoomService: TeacherMarkExamRoomService) {}

  @Post()
  create(@Body() createTeacherMarkExamRoomDto: CreateTeacherMarkExamRoomDto) {
    return this.teacherMarkExamRoomService.create(createTeacherMarkExamRoomDto);
  }

  @Get()
  findAll() {
    return this.teacherMarkExamRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherMarkExamRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherMarkExamRoomDto: UpdateTeacherMarkExamRoomDto) {
    return this.teacherMarkExamRoomService.update(+id, updateTeacherMarkExamRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherMarkExamRoomService.remove(+id);
  }
}
