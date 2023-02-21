import { Injectable } from '@nestjs/common';
import { CreateSystemNumberDto } from './dto/create-system_number.dto';
import { UpdateSystemNumberDto } from './dto/update-system_number.dto';

@Injectable()
export class SystemNumberService {
  create(createSystemNumberDto: CreateSystemNumberDto) {
    return 'This action adds a new systemNumber';
  }

  findAll() {
    return `This action returns all systemNumber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemNumber`;
  }

  update(id: number, updateSystemNumberDto: UpdateSystemNumberDto) {
    return `This action updates a #${id} systemNumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemNumber`;
  }
}
