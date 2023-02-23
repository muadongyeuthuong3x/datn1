
import { IsNotEmpty } from 'class-validator';
import { Exam } from 'src/exam/entities/exam.entity';
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';
export class CreateTableExamBigBlockClassDto {

    @IsNotEmpty()
    readonly time_year_start: String;

    @IsNotEmpty()
    readonly time_year_end: String;

    @IsNotEmpty()
    readonly id_big_class_exam: number;

    @IsNotEmpty()
    id_exam: any;


}
