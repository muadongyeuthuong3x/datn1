import { CacheModule, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]) , CacheModule.register({
      ttl: 30000
    })],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
 