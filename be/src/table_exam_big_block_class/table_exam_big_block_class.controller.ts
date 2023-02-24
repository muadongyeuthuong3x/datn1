import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadGatewayException,
} from '@nestjs/common';
import { TableExamBigBlockClassService } from './table_exam_big_block_class.service';
import { CreateTableExamBigBlockClassDto } from './dto/create-table_exam_big_block_class.dto';
import { UpdateTableExamBigBlockClassDto } from './dto/update-table_exam_big_block_class.dto';

@Controller('table-exam-big-block-class')
export class TableExamBigBlockClassController {
  constructor(
    private readonly tableExamBigBlockClassService: TableExamBigBlockClassService,
  ) {}

  @Post()
  async create(
    @Body() createTableExamBigBlockClassDto: CreateTableExamBigBlockClassDto,
  ) {
    const { id_exam, time_year_start, time_year_end, id_big_class_exam } =
      createTableExamBigBlockClassDto;
    if (id_exam.length < 1 || id_big_class_exam.length < 1) {
      throw new BadGatewayException({
        status: 'error',
        message: `Môn thi hoặc khóa thi còn thiếu`,
      });
    }
    const dataFind = {
      id_exam_where: id_exam,
      time_year_start: time_year_start,
    } as any;
    const dataCheckFind = await this.tableExamBigBlockClassService.findOneData(
      dataFind,
    );
    if (dataCheckFind) {
      throw new BadGatewayException({
        status: 'error',
        message: `Hiện tại môn thi này đã có trong hệ thống thi năm học ${time_year_start}-${time_year_end}`,
      });
    }
    return await this.tableExamBigBlockClassService.create(
      createTableExamBigBlockClassDto,
    );
  }

  @Get()
  async findAll() {
    return await this.tableExamBigBlockClassService.findAll();
  }

  @Post('/search')
  async findExam(@Body() data: CreateTableExamBigBlockClassDto) {
    return await this.tableExamBigBlockClassService.findSearchExamBigBlockClass(
      data,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTableExamBigBlockClassDto: UpdateTableExamBigBlockClassDto,
  ) {
    const { id_exam, id_big_class_exam } = updateTableExamBigBlockClassDto;
    if (id_exam.length < 1 || id_big_class_exam.length < 1) {
      throw new BadGatewayException({
        status: 'error',
        message: `Môn thi hoặc khóa thi còn thiếu`,
      });
    }
    return this.tableExamBigBlockClassService.update(
      +id,
      updateTableExamBigBlockClassDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableExamBigBlockClassService.remove(+id);
  }
}
