import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
import { Student } from './entities/student.entity';
import { Class } from 'src/class/entities/class.entity';
import { ClassService } from 'src/class/class.service';
import { ClassController } from 'src/class/class.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Student]),
    CsvModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [StudentsController, ClassController],
  providers: [StudentsService, ClassService],
})
export class StudentsModule {}
