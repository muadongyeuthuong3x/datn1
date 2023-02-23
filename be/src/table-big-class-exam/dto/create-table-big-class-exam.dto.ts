
import { IsNotEmpty } from 'class-validator';
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
export class CreateTableBigClassExamDto {

    @IsNotEmpty()
    id_big_class_exam: BigBlockClass;

    @IsNotEmpty()
    id_exam_big_block_class: TableExamBigBlockClass;


}
