import { CacheModule, Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule { }
