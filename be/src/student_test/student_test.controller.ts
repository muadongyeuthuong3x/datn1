import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentTestService } from './student_test.service';
import { CreateStudentTestDto } from './dto/create-student_test.dto';
import { UpdateStudentTestDto } from './dto/update-student_test.dto';

@Controller('student-test')
export class StudentTestController {
  constructor(private readonly studentTestService: StudentTestService) {}

  @Post()
  create(@Body() createStudentTestDto: CreateStudentTestDto) {
    return this.studentTestService.create(createStudentTestDto);
  }

  @Get()
  findAll() {
    return this.studentTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentTestDto: UpdateStudentTestDto) {
    return this.studentTestService.update(+id, updateStudentTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTestService.remove(+id);
  }
}
