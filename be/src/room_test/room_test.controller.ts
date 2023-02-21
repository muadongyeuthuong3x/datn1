import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomTestService } from './room_test.service';
import { CreateRoomTestDto } from './dto/create-room_test.dto';
import { UpdateRoomTestDto } from './dto/update-room_test.dto';

@Controller('room-test')
export class RoomTestController {
  constructor(private readonly roomTestService: RoomTestService) {}

  @Post()
  create(@Body() createRoomTestDto: CreateRoomTestDto) {
    return this.roomTestService.create(createRoomTestDto);
  }

  @Get()
  findAll() {
    return this.roomTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomTestDto: UpdateRoomTestDto) {
    return this.roomTestService.update(+id, updateRoomTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTestService.remove(+id);
  }
}
