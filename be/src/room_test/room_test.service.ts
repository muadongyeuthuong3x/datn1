import { Injectable } from '@nestjs/common';
import { CreateRoomTestDto } from './dto/create-room_test.dto';
import { UpdateRoomTestDto } from './dto/update-room_test.dto';

@Injectable()
export class RoomTestService {
  create(createRoomTestDto: CreateRoomTestDto) {
    return 'This action adds a new roomTest';
  }

  findAll() {
    return `This action returns all roomTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomTest`;
  }

  update(id: number, updateRoomTestDto: UpdateRoomTestDto) {
    return `This action updates a #${id} roomTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomTest`;
  }
}
