import { Module } from '@nestjs/common';
import { TableTeacherRoomService } from './table_teacher_room.service';
import { TableTeacherRoomController } from './table_teacher_room.controller';

@Module({
  controllers: [TableTeacherRoomController],
  providers: [TableTeacherRoomService]
})
export class TableTeacherRoomModule {}
