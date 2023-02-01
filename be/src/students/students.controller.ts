import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, csvFileName, getCSVFile } from 'src/csvLogic';
const fs = require('fs');
import { CsvParser } from 'nest-csv-parser';

class CreateStudent {
  name: string
  id: string
}

class ClassStudnet {
  id_class_kma : number
}

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService, private readonly csvParser: CsvParser) { }


  @Post('/import-csv')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/csv',
      filename: csvFileName,
    }),
    fileFilter: csvFileFilter,
  }))

  async importCSV(@UploadedFile() file: Express.Multer.File, @Body() formData: ClassStudnet, @Res() res: any) {
    const { filename } = file;
    const {id_class_kma} = formData;
    const csvPath = getCSVFile(filename);
    const readStream = fs.createReadStream(csvPath);
    try {
      const dataFind = await this.studentsService.findOneClass(id_class_kma);
      if(!dataFind){
        return res.status(500).json({
          status: "error",
          message: `Lớp không tồn tại trong hệ thống`
        })
      }
      const entities: CreateStudent[] = await this.csvParser.parse(readStream, CreateStudent) as any;
      const { list }: any = entities;
      for (let i = 0; i < list.length; i++) {
        const data: CreateStudentDto = await this.studentsService.findOne(list[i].code_student)
        if (data) {
          return res.status(500).json({
            status: "error",
            message: `Mã sinh viên này đã có trong hệ thống ${data.code_student}`
          })
        }
      }
      await this.studentsService.updateAllStudent(list);
      return res.status(200).json({
        status: "success",
        message: `Update các sinh viên thành công`
      })
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error
      })
    }
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
