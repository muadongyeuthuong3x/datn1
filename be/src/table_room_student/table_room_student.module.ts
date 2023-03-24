import { Module } from '@nestjs/common';
import { TableRoomStudentService } from './table_room_student.service';
import { TableRoomStudentController } from './table_room_student.controller';

@Module({
  controllers: [TableRoomStudentController],
  providers: [TableRoomStudentService]
})
export class TableRoomStudentModule {}
