import { PartialType } from '@nestjs/swagger';
import { CreateItemRoomExamAndTeacherDto } from './create-item-room-exam-and-teacher.dto';

export class UpdateItemRoomExamAndTeacherDto extends PartialType(CreateItemRoomExamAndTeacherDto) {}
