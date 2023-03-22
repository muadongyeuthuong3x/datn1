import { PartialType } from '@nestjs/swagger';
import { CreateTeacherTrackDto } from './create-teacher_track.dto';

export class UpdateTeacherTrackDto extends PartialType(CreateTeacherTrackDto) {}
