import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherTrackDto } from './dto/create-teacher_track.dto';
import { UpdateTeacherTrackDto } from './dto/update-teacher_track.dto';
import { TeacherTrack } from './entities/teacher_track.entity';

@Injectable()
export class TeacherTrackService {
  constructor(
    @InjectRepository(TeacherTrack)
    private readonly teacherTrackRepository: Repository<TeacherTrack>,
  ) { }
  async create(createTeacherTrackDto: CreateTeacherTrackDto) {
    for (let i = 0; i < createTeacherTrackDto.list_teacher.length; i++) {
      const createData = new TeacherTrack();
      createData.id_itemRoomExamAndTeacher = createTeacherTrackDto.idDataCreate;
      createData.id_Teacher =createTeacherTrackDto.list_teacher[i];
      await this.teacherTrackRepository.save(createData)
    }
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
