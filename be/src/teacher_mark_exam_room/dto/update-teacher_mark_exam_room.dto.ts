import { PartialType } from '@nestjs/swagger';
import { CreateTeacherMarkExamRoomDto } from './create-teacher_mark_exam_room.dto';

export class UpdateTeacherMarkExamRoomDto extends PartialType(CreateTeacherMarkExamRoomDto) {}
