import { Module } from '@nestjs/common';
import { RoomTestService } from './room_test.service';
import { RoomTestController } from './room_test.controller';

@Module({
  controllers: [RoomTestController],
  providers: [RoomTestService]
})
export class RoomTestModule {}
