import { PartialType } from '@nestjs/swagger';
import { CreateTableTeacherRoomDto } from './create-table_teacher_room.dto';

export class UpdateTableTeacherRoomDto extends PartialType(CreateTableTeacherRoomDto) {}
