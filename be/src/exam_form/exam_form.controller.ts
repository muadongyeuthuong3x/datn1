import { Controller, Get, Post, Body, Patch, Param, Delete, BadGatewayException, Res } from '@nestjs/common';
import { ExamFormService } from './exam_form.service';
import { CreateExamFormDto } from './dto/create-exam_form.dto';
import { UpdateExamFormDto } from './dto/update-exam_form.dto';

@Controller('exam-form')
export class ExamFormController {
  constructor(private readonly examFormService: ExamFormService) { }

  @Post()
  async create(@Body() createExamDto: CreateExamFormDto, @Res() res: any) {

    try {
      const data = await this.examFormService.findOneExam(createExamDto.name);
      if (!data) {
        const dataCreate = await this.examFormService.create(createExamDto);
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
      const data = await this.examFormService.findAll();
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
    return this.examFormService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExamFormDto: UpdateExamFormDto, @Res() res: any) {
    const { name } = updateExamFormDto;
    try {
      const data = await this.examFormService.findOneExam(name);
      const idEdit: number = data?.id;
      if (!!data && (+id !== idEdit)) {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại trong hệ thống"
        })
      }
      await this.examFormService.update(+id, name);
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
    return this.examFormService.findSearchExam(data.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.examFormService.remove(+id);
  }
}
