import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { Like, Repository } from 'typeorm';
@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    const departmentCreate = new Department();
    departmentCreate.department = createDepartmentDto.department;
    return this.departmentRepository.save(departmentCreate);
  }

  async findAll() {
    try {
      return await this.departmentRepository.find();
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }
  
  async searchDepartment(department: string) {
    try {
      const data = await this.departmentRepository.find({
        where: {
          department: Like(`%${department}%`),
        },
      });
      return data;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { department } = updateDepartmentDto;
    return this.departmentRepository.update(id, {
      department: department,
    });
  }
  findOneDepartment(department : string){
    return this.departmentRepository.findOneBy({ department: department });
  }

  findDepartmentById(id: number) {
    return this.departmentRepository.findOne({
     where :  {
        id,
      },
      relations : {
        idDepartment : true
      }
    });
}

  async remove(id: number) {
    try {
      const dataRemove = await this.departmentRepository.delete(id);
      return dataRemove;
    } catch (error) {
      console.log(error)
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }
  
}
