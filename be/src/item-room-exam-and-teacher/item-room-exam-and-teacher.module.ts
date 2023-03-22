import { Module } from '@nestjs/common';
import { ItemRoomExamAndTeacherService } from './item-room-exam-and-teacher.service';
import { ItemRoomExamAndTeacherController } from './item-room-exam-and-teacher.controller';

@Module({
  controllers: [ItemRoomExamAndTeacherController],
  providers: [ItemRoomExamAndTeacherService]
})
export class ItemRoomExamAndTeacherModule {}
