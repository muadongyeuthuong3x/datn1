
import { IsNotEmpty } from 'class-validator';
import { ExamForm } from 'src/exam_form/entities/exam_form.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Entity } from 'typeorm';

export type roomExam = {
    room_exam: number;
    teacher_exam: number[];
    teacher_score_student?: number,
    time_start_exam: Date;
    time_end_exam: Date;
}
@Entity('test-schedule-student')


export class CreateTestScheduleStudentDto {

    @IsNotEmpty()
    roomPeopleMax: string;
    @IsNotEmpty()

    mode: number;
    @IsNotEmpty()

    grading_exam: string;
    @IsNotEmpty()

    department: string;
    @IsNotEmpty()

    id_query_exam_big_class: TableExamBigBlockClass;
    @IsNotEmpty()

    id_exam_big_class: TableExamBigBlockClass;
    @IsNotEmpty()

    time_exam: number;
    @IsNotEmpty()

    id_query_form_exam: ExamForm;
    @IsNotEmpty()
    id_form_exam: ExamForm;

    @IsNotEmpty()
    form_exam : number;

    @IsNotEmpty()
    roomExamAndTeacher: roomExam[]

    @IsNotEmpty()
    timeYearExamStart: string
    
    @IsNotEmpty()
    id_exam: string
     
    
}
