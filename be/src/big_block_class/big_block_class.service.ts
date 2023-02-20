import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBigBlockClassDto } from './dto/create-big_block_class.dto';
import { UpdateBigBlockClassDto } from './dto/update-big_block_class.dto';
import { BigBlockClass } from './entities/big_block_class.entity';

@Injectable()
export class BigBlockClassService {

  constructor(
    @InjectRepository(BigBlockClass)
    private readonly bigBlockClassRepository: Repository<BigBlockClass>,
  ) { }

  create(bigBLockClass: string) {
    let newBigBlockClass = new BigBlockClass();
    newBigBlockClass.bigBlockClass = bigBLockClass;
    return this.bigBlockClassRepository.save(newBigBlockClass);
  }

  findOneBigBlockClass(bigBlockClass: string) {
    return this.bigBlockClassRepository.findOneBy({ bigBlockClass })
  }

  findAll() {
    return this.bigBlockClassRepository.find({
      order: {
        'id': 'ASC',
      }
    })
  }

  findOne(id: number) {
    return this.bigBlockClassRepository.findOneBy({ id })
  }

  update(id: number, bigBlockClass: string) {
    return this.bigBlockClassRepository.update(id, {bigBlockClass });
  }

  async findBigBlockClassService(bigBlockClass: string) {
    const data = await this.bigBlockClassRepository.find({
      where: {
        bigBlockClass: Like(`%${bigBlockClass}%`),
      },
    });
    return data;
  }

  remove(id: number) {
    return this.bigBlockClassRepository.delete({ id });
  }
}
