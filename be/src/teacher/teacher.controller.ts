import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { } 

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto, @Res() res: any) {
    try {
      const data = await this.teacherService.findOneTeacher(createTeacherDto.id_teacher);
      

      if (!data) {
        if( !createTeacherDto.id_teacher || !createTeacherDto.avatar || !createTeacherDto.idDepartment || !createTeacherDto.name || !createTeacherDto.phone_number){
          return res.status(500).json({
            status: "error",
            message: "Vui lòng điền đầy đủ thông tin" 
          });
        }
        const dataCreate = await this.teacherService.create(createTeacherDto);
        return res.status(200).json({
          status: "success",
          message: dataCreate
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại id giáo viên trong hệ thống"
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
    return await this.teacherService.findAll();
  }

  @Post('/search')
  async findExam(@Body() data: { name: string }) {
    return this.teacherService.searchTeacher(data.name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto, @Res() res: any) {
    const { id_teacher } = updateTeacherDto;
    try {
      const data = await this.teacherService.findOneTeacher(id_teacher);
      const idEdit: number = data?.id;
      if (!!data && (+id !== idEdit)) {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại id giáo viên trong hệ thống"
        })
      }
      await this.teacherService.update(+id, updateTeacherDto);
      return res.status(200).json({
        status: "success",
        message: "sửa thành công "
      })

    } catch (error) {

      return res.status(500).json({
        status: "error",
        message: "Server error"
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
