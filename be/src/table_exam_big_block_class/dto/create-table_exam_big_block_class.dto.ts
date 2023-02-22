
import { IsNotEmpty } from 'class-validator';
import { Exam } from 'src/exam/entities/exam.entity';
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
export class CreateTableExamBigBlockClassDto {

    @IsNotEmpty()
    readonly time_year_start: String;

    @IsNotEmpty()
    readonly time_year_end: String;

    @IsNotEmpty()
    readonly id_big_block_class: Array<BigBlockClass>;

    @IsNotEmpty()
    readonly id_exam: Exam;


}
