import { IsNotEmpty } from 'class-validator';
import { Exam } from 'src/exam/entities/exam.entity';
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
export class CreateTimeTestDto {

    @IsNotEmpty()
    readonly time_start: Date;

    @IsNotEmpty()
    readonly time_end: Date;

    @IsNotEmpty()
    readonly id_big_block_class: BigBlockClass;

    @IsNotEmpty()
    readonly idExam: Exam;

}
