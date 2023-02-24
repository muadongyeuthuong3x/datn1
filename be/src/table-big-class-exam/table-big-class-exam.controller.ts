import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TableBigClassExamService } from './table-big-class-exam.service';
@Controller('table-big-class-exam')
export class TableBigClassExamController {
  constructor(
    private readonly tableBigClassExamService: TableBigClassExamService,
  ) {}

  @Post()
  create(
    @Body()
    createTableBigClassExamDto: {
      id_big_class_exam: number[];
      id: number;
      queryRunner: any;
    },
  ) {
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

  async update(@Body() updateTableBigClassExamDto: any) {
    return await this.tableBigClassExamService.update(
      updateTableBigClassExamDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableBigClassExamService.remove(+id);
  }
}
