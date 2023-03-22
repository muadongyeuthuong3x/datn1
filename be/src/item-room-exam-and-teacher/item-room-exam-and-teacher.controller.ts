import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemRoomExamAndTeacherService } from './item-room-exam-and-teacher.service';
import { CreateItemRoomExamAndTeacherDto } from './dto/create-item-room-exam-and-teacher.dto';
import { UpdateItemRoomExamAndTeacherDto } from './dto/update-item-room-exam-and-teacher.dto';

@Controller('item-room-exam-and-teacher')
export class ItemRoomExamAndTeacherController {
  constructor(private readonly itemRoomExamAndTeacherService: ItemRoomExamAndTeacherService) {}

  @Post()
  create(@Body() createItemRoomExamAndTeacherDto: CreateItemRoomExamAndTeacherDto) {
    return this.itemRoomExamAndTeacherService.create(createItemRoomExamAndTeacherDto);
  }

  @Get()
  findAll() {
    return this.itemRoomExamAndTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemRoomExamAndTeacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemRoomExamAndTeacherDto: UpdateItemRoomExamAndTeacherDto) {
    return this.itemRoomExamAndTeacherService.update(+id, updateItemRoomExamAndTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemRoomExamAndTeacherService.remove(+id);
  }
}
