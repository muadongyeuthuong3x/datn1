import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TestScheduleStudentService } from './test_schedule_student.service';
import { CreateTestScheduleStudentDto } from './dto/create-test_schedule_student.dto';
import { UpdateTestScheduleStudentDto } from './dto/update-test_schedule_student.dto';

@Controller('test-schedule-student')
export class TestScheduleStudentController {
  constructor(private readonly testScheduleStudentService: TestScheduleStudentService) {}

  @Post()
 async create(@Body() createTestScheduleStudentDto: CreateTestScheduleStudentDto ,@Res() res: any,) {
    return await this.testScheduleStudentService.create(createTestScheduleStudentDto , res ); 
  }

  @Get()
 async findAll(@Res() res: any) {
    return  await this.testScheduleStudentService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testScheduleStudentService.findOne(+id);
  }

  @Post('/pdf')
  async exportDataPDf(   @Body() dataPdf: { id : number , subject : string , mode : number , blokcclass : string ; form_exam : string  }) {
    return  await this.testScheduleStudentService.exportPDf(dataPdf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestScheduleStudentDto: UpdateTestScheduleStudentDto) {
    return this.testScheduleStudentService.update(+id, updateTestScheduleStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.testScheduleStudentService.remove(+id);
  }

  @Post('/:time_start/:time_end')
  async findTeacherByDate(@Param('time_start') time_start: Date , @Param('time_end') time_end: Date  ,  @Body() idUnLess: number[]) {
    return await this.testScheduleStudentService.findListTeacherByTime(time_start , time_end, idUnLess); 
  }

  @Post('rooms/:time_start/:time_end')
  async findRoomsByDate(@Param('time_start') time_start: Date , @Param('time_end') time_end: Date  ,  @Body() idUnLess: number[]) {
    return await this.testScheduleStudentService.findListRoomsByTime(time_start , time_end, idUnLess); 
  }

}
