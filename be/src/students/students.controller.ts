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
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, csvFileName, getCSVFile } from 'src/csvLogic';
import { CreateStudentDto } from './dto/create-student.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require('xlsx');

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

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
    @Body() formData: any,
    @Res() res: any,
  ) {
    const { originalname } = file;
    const filePath = getCSVFile(originalname);
    const { id_exam, name } = formData;
    // const myRegex = /^[a-zA-Z0-9]{3,}.xlsx+$/g;
    // const a = "ssfsad.svg";
    // const b = "fasfsaf.xlsx";

    const workbook = XLSX.readFile(filePath);
    const data = [];
    const sheets = workbook.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[i]],
      );
      const getKeys = Object.keys(temp[0]);
      if (
        getKeys[0] !== 'STT' ||
        getKeys[1] !== 'Mã Sinh Viên' ||
        getKeys[2] !== 'Họ và Tên' ||
        getKeys[3] !== 'Điểm Chuyên Cần' ||
        getKeys[4] !== 'Điểm giữa kì' ||
        getKeys.length !== 5
      ) {
        return res.status(500).json({
          status: 'error',
          message: 'Upload điểm vào database chưa đúng format',
        });
      }
      temp.forEach((res: any) => {
        data.push(res);
      });
    }
    return await this.studentsService.create(id_exam, data, name, res);
  }

  @Post('/import-csv/end')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './upload',
        filename: csvFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async importCSVEnd(
    @UploadedFile() file: Express.Multer.File,
    @Body() formData: any,
    @Res() res: any,
  ) {
    const { originalname } = file;
    const filePath = getCSVFile(originalname);
    const { id_exam, name } = formData;
    const workbook = XLSX.readFile(filePath);
    const data = [];
    const sheets = workbook.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[i]],
      );
      const getKeys = Object.keys(temp[0]);
      if (
        getKeys[0] !== 'STT' ||
        getKeys[1] !== 'Mã Sinh Viên' ||
        getKeys[2] !== 'Họ và Tên' ||
        getKeys[3] !== 'Điểm Cuối Kì' ||
        getKeys.length !== 4
      ) {
        return res.status(500).json({
          status: 'error',
          message: 'Upload điểm vào database chưa đúng format',
        });
      }
      temp.forEach((res: any) => {
        data.push(res);
      });
    }
    return await this.studentsService.createScoreEnd(id_exam, data, name, res);
  }

  @Post('/import-csv/end_end')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './upload',
        filename: csvFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async importCSVEndEnd(
    @UploadedFile() file: Express.Multer.File,
    @Body() formData: any,
    @Res() res: any,
  ) {
    const { originalname } = file;
    const filePath = getCSVFile(originalname);
    const { id_exam, name } = formData;
    const workbook = XLSX.readFile(filePath);
    const data = [];
    const sheets = workbook.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[i]],
      );
      const getKeys = Object.keys(temp[0]);
      if (
        getKeys[0] !== 'STT' ||
        getKeys[1] !== 'Mã Sinh Viên' ||
        getKeys[2] !== 'Họ và Tên' ||
        getKeys[3] !== 'Điểm Thi Lại' ||
        getKeys.length !== 4
      ) {
        return res.status(500).json({
          status: 'error',
          message: 'Upload điểm vào database chưa đúng format',
        });
      }
      temp.forEach((res: any) => {
        data.push(res);
      });
    }
    return await this.studentsService.createScoreEndEnd(
      id_exam,
      data,
      name,
      res,
    );
  }
  @Post('/search-score')
  async getAllScrore(
    @Body()
    data: {
      id_exam_where: string;
      time_year_start: string;
      time_year_end: string;
    },
    @Res() res: any,
  ) {
    return await this.studentsService.searchScoreStudent(data, res);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentsService.findOne(+id);
  // }
  @Post('/create')
  createSCoreStudent(@Body() createDto: CreateStudentDto, @Res() res: any) {
    return this.studentsService.createScoreStudent(createDto, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: any,
  ) {
    return this.studentsService.update(+id, updateStudentDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Post('/tt-score-studnet')
  ttScore(@Body() data: any, @Res() res: any) {
    return this.studentsService.ttScoreStudent(data, res);
  }
}
