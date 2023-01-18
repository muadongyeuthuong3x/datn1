import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockClass } from './entities/block_class.entity';
import { Not, Repository } from 'typeorm';
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
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

  }

  async findOneblockClass(blockClass: string): Promise<BlockClass> {
    const data = await this.blockClassRepository.findOne({
      where: {
        blockClass,
      },
    });
    return data;
  }


  async findOneblockClassUpdate(id: Number, blockClass: string): Promise<BlockClass> {
    const data = await this.blockClassRepository.findOne({
      where: {
        blockClass,
      },
    });
    return data;
  }


  findAll() {
    return this.blockClassRepository.find({
      order: {
        'id': 'ASC',
      },
      relations: {
        class: true,
      },
    })
  }

  findOne(id: number) {
    return this.blockClassRepository.findOneBy({ id });
  }

  update(id: number, blockClass: string) {
    return this.blockClassRepository.update(id, { blockClass: blockClass });
  }

  remove(id: number) {
    return this.blockClassRepository.delete({ id });
  }
}
