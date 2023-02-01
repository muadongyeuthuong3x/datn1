import { CacheModule, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class , Student]) , CacheModule.register({
      ttl: 30000
    })],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
 