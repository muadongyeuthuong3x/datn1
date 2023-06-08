import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TestScheduleStudentService } from './test_schedule_student.service';
import { CreateTestScheduleStudentDto } from './dto/create-test_schedule_student.dto';
import { UpdateTestScheduleStudentDto } from './dto/update-test_schedule_student.dto';
import type { Response } from 'express';
import { join } from 'path';
const FormData = require('form-data');
const fs = require('fs');
var pdf = require("pdf-creator-node");
var pdf1 = require('html-pdf');

@Controller('test-schedule-student')
export class TestScheduleStudentController {
  constructor(private readonly testScheduleStudentService: TestScheduleStudentService) { }

  @Post()
  async create(@Body() createTestScheduleStudentDto: CreateTestScheduleStudentDto, @Res() res: any,) {
    return await this.testScheduleStudentService.create(createTestScheduleStudentDto, res);
  }

  @Post('/edit')
  async update(
    @Body() updateTestScheduleStudentDto: UpdateTestScheduleStudentDto,
    @Res() res: any,
  ) {
    return await this.testScheduleStudentService.update(
      updateTestScheduleStudentDto,
      res,
    );
  }


  @Post('/search')
  async searchData(
    @Body() dataSearch: {
      semester: string,
      time_year_start: string
    },
    @Res() res: any,
  ) {
    return await this.testScheduleStudentService.findAllSearch(
      dataSearch,
      res,
    );
  }

  @Get()
  async findAll(@Res() res: any) {
    return await this.testScheduleStudentService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testScheduleStudentService.findOne(+id);
  }

  @Post('/pdf')
  async exportDataPDf(@Body() dataPdf: { id: number, subject: string, mode: number, blokcclass: string; form_exam: string }) {
    return await this.testScheduleStudentService.exportPDf(dataPdf);
  }



  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: any) {
    return await this.testScheduleStudentService.remove(+id, res);
  }

  @Post('/:time_start/:time_end')
  async findTeacherByDate(@Param('time_start') time_start: Date, @Param('time_end') time_end: Date, @Body() idUnLess: number[]) {
    return await this.testScheduleStudentService.findListTeacherByTime(time_start, time_end, idUnLess);
  }

  @Post('rooms/:time_start/:time_end')
  async findRoomsByDate(@Param('time_start') time_start: Date, @Param('time_end') time_end: Date, @Body() idUnLess: number[]) {
    return await this.testScheduleStudentService.findListRoomsByTime(time_start, time_end, idUnLess);
  }

  
//   @Post('rooms/:time_start/:time_end')
//   async findRoomsByDateEdit(
//     @Param('time_start') time_start: Date,
//     @Param('time_end') time_end: Date,
//     @Body() idUnLess: number[],
//   ) {
//     return await this.testScheduleStudentService.findListRoomsByTimeEdit(
//       time_start,
//       time_end,
//       idUnLess)
//   }

  

    @Get('countteacher/:time_start/:time_end/:id')
    async findCountRooms(
        @Param('time_start') time_start: Date,
        @Param('time_end') time_end: Date,
        @Param('id') id: number,
    ) {
    return await this.testScheduleStudentService.findCountTeachers(
      time_start,
      time_end,
      id,
    );
    }

    @Get('countrooms/:time_start/:time_end/:id')
    async findCounRoomServiers(
        @Param('time_start') time_start: Date,
        @Param('time_end') time_end: Date,
        @Param('id') id: number,
    ) {
        return await this.testScheduleStudentService.findCounRoomServiers(
            time_start,
            time_end,
            id,)
    }


  async dowloadPDF(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    //   const buffer =  await this.testScheduleStudentService.dowloadPDFSchedule(id); 
    //   res.set({
    //     'Content-Type' : 'application/pdf',
    //     'Content-Disposition': 'attachment; filename=quote.pdf', 
    //     'Content-Length': buffer.length
    //   })
    //   res.end(buffer); 
    const data = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=
        , initial-scale=1.0">
        <title>Document</title>
        <style>
          body {
            padding: 20px 20px;
            with : 100%;
          }
            header {
                display: -webkit-box;
                display: flex;
                -webkit-box-pack: justify;
                webkit-justify-content: space-around;
                justify-content: space-around;
            }
        
            .left,
            .right,
            .left_p,
            .right_p {
                color: black;
                font-size: 35;
                font-weight: bold;
            }
        
            .left_p {
                margin-left: 37px;
                border-bottom: 2px solid black;
                width: 168px;
            }
        
            .right_p {
                margin-left: 60px;
                border-bottom: 2px solid black;
                width: 200px;
            }
        
            .titile {
              display: -webkit-box;
              display: flex;
              -webkit-box-pack: center; 
              webkit-justify-content: center;
              justify-content: center;
                color: black;
                font-size: 35;
                font-weight: bold;
                padding-right: 70px !important;
                padding-top: 10px !important;
            }
        
            .exam {
                display: -webkit-box;
                margin-top: 20px;
                -webkit-box-pack: justify;
                display: -webkit-box;
                display: flex;
                -webkit-box-pack: justify;
                webkit-justify-content: space-around;
            }
        
            .exam1 {
                color: black;
                font-size: 35;
                font-weight: bold;
            }
        
            .date_exam {
                display: -webkit-box;
                -webkit-box-pack: justify
                margin-top: 5px;
                display: -webkit-box;
                display: flex;
                -webkit-box-pack: justify;
                webkit-justify-content: space-around;
            }
        
            .room_exam {
                color: black;
                font-size: 35;
                font-weight: bold;
            }
        
            .total_exam {
                display: -webkit-box;
                -webkit-box-pack: justify
                margin-top: 5px;
                display: -webkit-box;
                display: flex;
                -webkit-box-pack: justify;
                webkit-justify-content: space-around;
            }
        
        
            table {
                margin-top: 10px;
            }
        
        
            table,
            th,
            td {
                border: 1px solid black;
                border-collapse: collapse;
                -ms-flex-pack: justify;
                text-align: center;
            }
        
            .stt {
                width: 25px;
            }
        
            .sbd {
                width: 25px;
            }
        
            .msv {
                width: 90px;
            }
        
            .hd {
                width: 200px;
            }
        
            .name {
                width: 90px;
            }
        
            .ds {
                width: 50px;
            }
        
            .kn {
                width: 70px;
            }
        
            .gc {
                width: 80px;
            }
        
            .hndate {
                margin: 10px 0px;
                display: -webkit-box;
                -webkit-box-pack: justify;
                webkit-justify-content: space-around;
            }
        
            .footer {
                display: -webkit-box;
                -webkit-box-pack: justify;
                webkit-justify-content: space-around;
                color: black;
                font-size: 30;
                font-weight: bold; 
            }
        </style>
    </head>
    
    <body>
    
        <header>
            <div class="left">
                HỌC VIỆN KỸ THUẬT MẬT MÃ
                <p class="left_p">PHÒNG KT&ĐBCLĐT</p>
            </div>
    
            <div class="right">
                CỘNG HÒA XÃ HÔI CHỦ NGHĨA VIỆT NAM
                <p class="right_p">Độc lập - Tự do - Hạnh phúc</p>
            </div>
    
    
        </header>
    
        <div class="titile">
            DANH SÁCH THI LẠI
        </div>
        <div class="titile">
            Năm học 2022-2023 học kỳ 1 -AT15
        </div>
    
        <div class="exam">
            <div class="">
                Tên học phần: <span class="exam1">Quản trị an toàn hệ thống</span>
            </div>
            <div class="">
                Số TC : 4
            </div>
        </div>
    
        <div class="date_exam">
            <div class="">
                Ngày thi : 16-03-2023
            </div>
            <div class="">
                Hình thức : Thực hành
            </div>
            <div class="">
                Ca thi : 8h
            </div>
            <div >
                Thi tại :  <span class="room_exam"> P301-TA3 </span>
            </div>
        </div>
    
    
        <div class="total_exam">
            <div class="">
                Tổng số sinh viên: ....
            </div>
            <div class="">
                Số sinh viên dự thi: ....
            </div>
            <div class="">
                Vắng : ..........
            </div>
            <div class="">
                Có lý do : .......
            </div>
            <div class="">
                Không lý do : .......
            </div>
        </div>
    
        <table style="width:100%">
            <tr>
              <th class="stt">STT</th>
              <th class="msv">Mã SV</th>
              <th class="hd">Họ đệm</th>
              <th class="name">Tên</th>
              <th class="ds">Đề số </th>
              <th class="score">Điểm số</th>
              <th class="score">Điểm chữ</th>
              <th class="kn">Ký nhận</th>
              <th class="gc">Ghi chú</th>
            </tr>
            <tr>
              <td>1</td>
              <td>CT030209</td>
              <td>Nguyễn Mạnh </td>
              <td> Cường </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
       
          </table>
    
          <div class="hndate">
          <div> </div>
           <div>  Hà Nội, ... tháng .... năm </div>
          </div>
    
          <div class="footer">
            <div> Cán bộ coi thi thứ nhất</div>
            <div> Cán bộ coi thi thứ hai</div>
            <div> Người nhận bài thi </div>
          </div>
    
    </body>
    
    </html>`
    pdf1.create(data).toBuffer(function (err, buffer) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=quote.pdf',
        'Content-Length': buffer.length
      })
      res.end(buffer);
    });

  }

}
