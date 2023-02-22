
import { IsNotEmpty } from 'class-validator';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
export class CreateTableExamBigBlockClassDto {

    @IsNotEmpty()
    readonly id_class: TableExamBigBlockClass;


}
