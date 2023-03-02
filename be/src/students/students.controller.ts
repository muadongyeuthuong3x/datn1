/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, csvFileName, getCSVFile } from 'src/csvLogic';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require('xlsx');
const fs = require('fs')


class ClassStudnet {
  id_class_kma: number;
}

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post('/import-csv/beet-ween')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './upload',
        filename: csvFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async importCSV(
    @UploadedFile() file: Express.Multer.File,
    @Body() formData: ClassStudnet,
    @Res() res: any,
  ) {
    const { originalname } = file;

    const filePath = getCSVFile(originalname);
    try {
      // const dataFind = await this.studentsService.findOneClass(id_class_kma);
      // if(!dataFind){
      //   return res.status(500).json({
      //     status: "error",
      //     message: `Lớp không tồn tại trong hệ thống`
      //   })
      // }

      const workbook = XLSX.readFile(filePath);
      const data = [];

      const sheets = workbook.SheetNames;

      for (let i = 0; i < sheets.length; i++) {
        const temp = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[i]],
        );
        temp.forEach((res) => {
          data.push(res);
        });
      }

      // Printing data
      console.log(data);

      //sh.getRow(1).getCell(2).value = 32;
      // console.log("Row-3 | Cell-2 - " + sh.getRow(3).getCell(2).value);

      // console.log(sh.rowCount);
      // //Get all the rows data [1st and 2nd column]
      // for (let i = 1; i <= sh.rowCount; i++) {
      //   console.log(sh.getRow(i).getCell(1).value);
      //   console.log(sh.getRow(i).getCell(2).value);
      // }
      // const { list }: any = entities;
      // for (let i = 0; i < list.length; i++) {
      //   const data: CreateStudentDto = await this.studentsService.findOne(list[i].code_student)
      //   if (data) {
      //     return res.status(500).json({
      //       status: "error",
      //       message: `Mã sinh viên này đã có trong hệ thống ${data.code_student}`
      //     })
      //   }
      // }
      // await this.studentsService.updateAllStudent(list);
      // return res.status(200).json({
      //   status: "success",
      //   message: `Update các sinh viên thành công`
      // })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: error,
      });
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
