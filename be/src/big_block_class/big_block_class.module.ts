import { Module } from '@nestjs/common';
import { BigBlockClassService } from './big_block_class.service';
import { BigBlockClassController } from './big_block_class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigBlockClass } from './entities/big_block_class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BigBlockClass])],
  controllers: [BigBlockClassController],
  providers: [BigBlockClassService]
})
export class BigBlockClassModule { }
