import { PartialType } from '@nestjs/swagger';
import { CreateTableBigClassExamDto } from './create-table-big-class-exam.dto';

export class UpdateTableBigClassExamDto extends PartialType(CreateTableBigClassExamDto) {}
