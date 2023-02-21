import { CacheModule, Module } from '@nestjs/common';
import { TimeTestService } from './time_test.service';
import { TimeTestController } from './time_test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeTest } from './entities/time_test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeTest]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [TimeTestController],
  providers: [TimeTestService]
})
export class TimeTestModule { }
