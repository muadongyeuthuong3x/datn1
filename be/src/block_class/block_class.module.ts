import {CacheModule , Module } from '@nestjs/common';
import { BlockClassService } from './block_class.service';
import { BlockClassController } from './block_class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockClass } from './entities/block_class.entity';


@Module({

  imports: [
  TypeOrmModule.forFeature([BlockClass]) , CacheModule.register({
    ttl: 30000
  })],
  controllers: [BlockClassController],
  providers: [
    BlockClassService,

  ]
})
export class BlockClassModule {}
 