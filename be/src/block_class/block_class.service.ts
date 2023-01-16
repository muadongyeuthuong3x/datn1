import { Injectable, BadGatewayException } from '@nestjs/common';
import { CreateBlockClassDto } from './dto/create-block_class.dto';
import { UpdateBlockClassDto } from './dto/update-block_class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockClass } from './entities/block_class.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class BlockClassService {

  constructor(
    @InjectRepository(BlockClass)
    private readonly blockClassRepository: Repository<BlockClass>,
    private dataSource: DataSource
  ) { }

  async create(blockClass: string) {
    let newUser = new BlockClass();
    newUser.blockClass = blockClass;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return data;
    } catch (error) {
      const data =  await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

  }

  async findOneblockClass(blockClass: string) {
    const data = await this.blockClassRepository.findOne({
      where: {
        blockClass,
      },
    });
    return data;
  }

  findAll() {
    return this.blockClassRepository.find();
  }

  findOne(id: number) {
    return this.blockClassRepository.findOneBy({ id });
  }

  update(id: number, updateBlockClassDto: UpdateBlockClassDto) {
    return `This action updates a #${id} blockClass`;
  }

  remove(id: number) {
    return this.blockClassRepository.delete({ id });
  }
}
