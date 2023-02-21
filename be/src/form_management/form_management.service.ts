import { Injectable } from '@nestjs/common';
import { CreateFormManagementDto } from './dto/create-form_management.dto';
import { UpdateFormManagementDto } from './dto/update-form_management.dto';

@Injectable()
export class FormManagementService {
  create(createFormManagementDto: CreateFormManagementDto) {
    return 'This action adds a new formManagement';
  }

  findAll() {
    return `This action returns all formManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formManagement`;
  }

  update(id: number, updateFormManagementDto: UpdateFormManagementDto) {
    return `This action updates a #${id} formManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} formManagement`;
  }
}
