import { Module } from '@nestjs/common';
import { TeacherTrackService } from './teacher_track.service';
import { TeacherTrackController } from './teacher_track.controller';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherTrack } from './entities/teacher_track.entity';
import { TeacherController } from 'src/teacher/teacher.controller';
import { TeacherService } from 'src/teacher/teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher ,TeacherTrack]),
     TeacherModule
  ],
  controllers: [TeacherTrackController , TeacherController],
  providers: [TeacherTrackService, TeacherService]
})
export class TeacherTrackModule {}
