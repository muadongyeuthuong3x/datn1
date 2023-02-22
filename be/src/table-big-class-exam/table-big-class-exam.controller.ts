import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableBigClassExamService } from './table-big-class-exam.service';
import { CreateTableBigClassExamDto } from './dto/create-table-big-class-exam.dto';
import { UpdateTableBigClassExamDto } from './dto/update-table-big-class-exam.dto';

@Controller('table-big-class-exam')
export class TableBigClassExamController {
  constructor(private readonly tableBigClassExamService: TableBigClassExamService) {}

  @Post()
  create(@Body() createTableBigClassExamDto: CreateTableBigClassExamDto) {
    return this.tableBigClassExamService.create(createTableBigClassExamDto);
  }

  @Get()
  findAll() {
    return this.tableBigClassExamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableBigClassExamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableBigClassExamDto: UpdateTableBigClassExamDto) {
    return this.tableBigClassExamService.update(+id, updateTableBigClassExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableBigClassExamService.remove(+id);
  }
}
