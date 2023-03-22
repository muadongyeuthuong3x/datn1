import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherTrackService } from './teacher_track.service';
import { CreateTeacherTrackDto } from './dto/create-teacher_track.dto';
import { UpdateTeacherTrackDto } from './dto/update-teacher_track.dto';

@Controller('teacher-track')
export class TeacherTrackController {
  constructor(private readonly teacherTrackService: TeacherTrackService) {}

  @Post()
  create(@Body() createTeacherTrackDto: CreateTeacherTrackDto) {
    return this.teacherTrackService.create(createTeacherTrackDto);
  }

  @Get()
  findAll() {
    return this.teacherTrackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherTrackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherTrackDto: UpdateTeacherTrackDto) {
    return this.teacherTrackService.update(+id, updateTeacherTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherTrackService.remove(+id);
  }
}
