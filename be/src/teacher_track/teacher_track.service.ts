import { Injectable } from '@nestjs/common';
import { CreateTeacherTrackDto } from './dto/create-teacher_track.dto';
import { UpdateTeacherTrackDto } from './dto/update-teacher_track.dto';

@Injectable()
export class TeacherTrackService {
  create(createTeacherTrackDto: CreateTeacherTrackDto) {
    return 'This action adds a new teacherTrack';
  }

  findAll() {
    return `This action returns all teacherTrack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherTrack`;
  }

  update(id: number, updateTeacherTrackDto: UpdateTeacherTrackDto) {
    return `This action updates a #${id} teacherTrack`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherTrack`;
  }
}
