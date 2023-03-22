import { Module } from '@nestjs/common';
import { TeacherTrackService } from './teacher_track.service';
import { TeacherTrackController } from './teacher_track.controller';

@Module({
  controllers: [TeacherTrackController],
  providers: [TeacherTrackService]
})
export class TeacherTrackModule {}
