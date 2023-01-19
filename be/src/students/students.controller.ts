import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, csvFileName, getCSVFile } from 'src/csvLogic';
import fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import path from 'path';


class CreateStudent {
  name: string
  id: string
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
  async importCSV(@UploadedFile() file: Express.Multer.File) {
    const { filename } = file;
    const csvPath = getCSVFile(filename);
    const stream = fs.createReadStream(csvPath);

    // const entities: CreateStudent[] = await this.csvParser.parse(stream, CreateStudent) as any;
    // // You will get JSON
    // console.log(entities);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
