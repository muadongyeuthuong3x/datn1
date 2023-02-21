import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadGatewayException } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Post()
  async create(@Body() createExamDto: CreateExamDto, @Res() res: any) {

    try {
      const data = await this.examService.findOneExam(createExamDto.name);
      if (!data) {
        const dataCreate = await this.examService.create(createExamDto);
        return res.status(200).json({
          status: "success",
          message: dataCreate
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại môn thi trong hệ thống"
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
    try {
      const data = await this.examService.findAll();
      return data;
    } catch (error) {
      throw new BadGatewayException({
        error: "error",
        message: "Error Token"
      })
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto, @Res() res: any) {
    const { name } = updateExamDto;
    try {
      const data = await this.examService.findOneExam(name);
      const idEdit: number = data?.id;
      if (!!data && (+id !== idEdit)) {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại trong hệ thống"
        })
      }
      await this.examService.update(+id, name);
      return res.status(200).json({
        status: "success",
        message: "sửa thành công "
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
    return this.examService.findSearchExam(data.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.examService.remove(+id);
  }
}
