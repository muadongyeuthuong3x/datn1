import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TestScheduleStudentService } from './test_schedule_student.service';
import { CreateTestScheduleStudentDto } from './dto/create-test_schedule_student.dto';
import { UpdateTestScheduleStudentDto } from './dto/update-test_schedule_student.dto';

@Controller('test-schedule-student')
export class TestScheduleStudentController {
  constructor(private readonly testScheduleStudentService: TestScheduleStudentService) {}

  @Post()
  create(@Body() createTestScheduleStudentDto: CreateTestScheduleStudentDto ,@Res() res: any,) {
    return this.testScheduleStudentService.create(createTestScheduleStudentDto , res ); 
  }

  @Get()
  findAll(@Res() res: any) {
    return this.testScheduleStudentService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testScheduleStudentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestScheduleStudentDto: UpdateTestScheduleStudentDto) {
    return this.testScheduleStudentService.update(+id, updateTestScheduleStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testScheduleStudentService.remove(+id);
  }
}
