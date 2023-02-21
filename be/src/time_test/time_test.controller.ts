import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeTestService } from './time_test.service';
import { CreateTimeTestDto } from './dto/create-time_test.dto';
import { UpdateTimeTestDto } from './dto/update-time_test.dto';

@Controller('time-test')
export class TimeTestController {
  constructor(private readonly timeTestService: TimeTestService) { }

  @Post()
  create(@Body() createTimeTestDto: CreateTimeTestDto) {
    return this.timeTestService.create(createTimeTestDto);
  }

  @Get()
  async findAll() {
    return await this.timeTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeTestDto: UpdateTimeTestDto) {
    return this.timeTestService.update(+id, updateTimeTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeTestService.remove(+id);
  }
}
