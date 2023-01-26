import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, csvFileName, getCSVFile } from 'src/csvLogic';
import fs from 'fs';
import { CsvParser } from 'nest-csv-parser';

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
    
    const { filename , path , destination } = file;
    console.log(file)
    const csvPath = getCSVFile(filename);
    console.log(csvPath);
    const readStream = fs.createReadStream(csvPath);


    // readStream.on('data', (chunk) => {
    //   console.log(chunk);
    // });

    // readStream.on('error', (err) => {
    //   console.log(err);
    //   console.log('error found');
    // });

    // readStream.on('end', () => {
    //   console.log('Finished reading');
    // });

    const entities: CreateStudent[] = await this.csvParser.parse(readStream, CreateStudent ,  1 , 1 ,   { strict: true, separator: ',' }) as any;
    console.log(entities)

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
