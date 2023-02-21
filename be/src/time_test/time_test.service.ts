import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTimeTestDto } from './dto/create-time_test.dto';
import { UpdateTimeTestDto } from './dto/update-time_test.dto';
import { TimeTest } from './entities/time_test.entity';

@Injectable()
export class TimeTestService {

  constructor(
    @InjectRepository(TimeTest)
    private readonly timeTestRepository: Repository<TimeTest>,
  ) { }


  create(createTimeTestDto: CreateTimeTestDto) {

    const timeTestCreate = new TimeTest();
    timeTestCreate.time_start = createTimeTestDto.time_start;
    timeTestCreate.time_end = createTimeTestDto.time_end;
    timeTestCreate.idExam = createTimeTestDto.idExam;
    timeTestCreate.id_big_block_class = createTimeTestDto.id_big_block_class;
    return this.timeTestRepository.save(timeTestCreate);
  }

  findAll() {
    try {
      return this.timeTestRepository.find();
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} timeTest`;
  }

  update(id: number, updateTimeTestDto: UpdateTimeTestDto) {
    return `This action updates a #${id} timeTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeTest`;
  }
}
