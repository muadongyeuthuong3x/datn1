import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherController } from 'src/teacher/teacher.controller';
import { TeacherService } from 'src/teacher/teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department , Teacher])],
  controllers: [DepartmentController , TeacherController],
  providers: [DepartmentService, TeacherService]
})
export class DepartmentModule {}
