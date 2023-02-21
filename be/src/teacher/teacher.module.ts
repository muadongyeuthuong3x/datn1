import { CacheModule, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import  {Teacher} from "./entities/teacher.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]), CacheModule.register({
      ttl: 30000
    })],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
