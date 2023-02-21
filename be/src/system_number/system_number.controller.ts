import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemNumberService } from './system_number.service';
import { CreateSystemNumberDto } from './dto/create-system_number.dto';
import { UpdateSystemNumberDto } from './dto/update-system_number.dto';

@Controller('system-number')
export class SystemNumberController {
  constructor(private readonly systemNumberService: SystemNumberService) {}

  @Post()
  create(@Body() createSystemNumberDto: CreateSystemNumberDto) {
    return this.systemNumberService.create(createSystemNumberDto);
  }

  @Get()
  findAll() {
    return this.systemNumberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemNumberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemNumberDto: UpdateSystemNumberDto) {
    return this.systemNumberService.update(+id, updateSystemNumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemNumberService.remove(+id);
  }
}
