import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @Res() res: any) {
    try {
      const data = await this.roomService.findOneRoom(createRoomDto.name);
      if (!data) {
        const dataCreate = await this.roomService.create(createRoomDto);
        return res.status(200).json({
          status: "success",
          message: dataCreate
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại phòng thi trong hệ thống"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "server error"
      })
    }
  }

  @Get()
  async findAll() {
    return await this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @Res() res: any) {
    const { name } = updateRoomDto;
    try {
      const data = await this.roomService.findOneRoom(name);
      const idEdit: number = data?.id;
      if (!!data && (+id !== idEdit)) {
        return res.status(500).json({
          status: "error",
          message: "Phòng Thi đã tồn tại trong hệ thống"
        })
      }
      await this.roomService.update(+id, updateRoomDto);
      return res.status(200).json({
        status: "success",
        message: "sửa thành công"
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: "error",
        message: "Server error"
      })
    }
  }


  @Post('/search')
  async findExam(@Body() data: { name: string }) {
    return this.roomService.findSearchRoom(data.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
