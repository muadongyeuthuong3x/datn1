import { PartialType } from '@nestjs/swagger';
import { CreateTableExamBigBlockClassDto } from './create-table_exam_big_block_class.dto';

export class UpdateTableExamBigBlockClassDto extends PartialType(CreateTableExamBigBlockClassDto) {}
