import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadGatewayException } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
   async create(@Body() createDepartmentDto: CreateDepartmentDto, @Res() res: any) {
      try {
        const data = await this.departmentService.findOneDepartment(createDepartmentDto.department);
        if (!data) {
          const dataCreate = await this.departmentService.create(createDepartmentDto);
          return res.status(200).json({
            status: "success",
            message: dataCreate
          });
        } else {
          return res.status(500).json({
            status: "error",
            message: "Đã tồn tại  trong hệ khoa trong hệ thống"
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
      try {
        const data = await this.departmentService.findAll();
        return data;
      } catch (error) {
        throw new BadGatewayException({
          error: "error",
          message: "Error Token"
        })
      }
  }
  
  @Get('/query_teacher/:id')
    async findDepartment(@Param('id') id: string) {
      try {
        const data = await this.departmentService.findDepartmentById(+id);
        return data;
      } catch (error) {
        throw new BadGatewayException({
          error: "error",
          message: "Error Token"
        })
      }
  }

  @Post('/search')
  async findExam(@Body() data: { department: string }) {
    return this.departmentService.searchDepartment(data.department);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDepartmentrDto: UpdateDepartmentDto, @Res() res: any) {
    const { department } = updateDepartmentrDto;
    try {
      const data = await this.departmentService.findOneDepartment(department);
      const idEdit: number = data?.id;
      if (!!data && (+id !== idEdit)) {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại  trong hệ khoa trong hệ thống"
        })
      }
      await this.departmentService.update(+id, updateDepartmentrDto);
      return res.status(200).json({
        status: "success",
        message: "sửa thành công "
      })

    } catch (error) {
      console.log(error);    
      return res.status(500).json({
        status: "error",
        message: "Server error"
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
