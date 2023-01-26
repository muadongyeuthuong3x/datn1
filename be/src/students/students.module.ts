import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from "nest-csv-parser";
import { MulterModule } from "@nestjs/platform-express";
import { Student } from './entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    CsvModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule { }
 