import { PartialType } from '@nestjs/swagger';
import { CreateTableRoomStudentDto } from './create-table_room_student.dto';

export class UpdateTableRoomStudentDto extends PartialType(CreateTableRoomStudentDto) {}
