import { IsNotEmpty } from "class-validator";
import { TestScheduleStudent } from "src/test_schedule_student/entities/test_schedule_student.entity";

export type roomExam = {
    room_exam: number;
    teacher_exam: number[];
    teacher_score_student?: number,
    time_start_exam: Date;
    time_end_exam: Date;
}

export class CreateItemRoomExamAndTeacherDto { 
     
    @IsNotEmpty()
    readonly id_query_test_schedule_student: TestScheduleStudent;

    @IsNotEmpty()
    roomExamAndTeacher: roomExam[];
    
    @IsNotEmpty()
    mode: number;
   
    @IsNotEmpty()
    grading_exam: number;

    @IsNotEmpty()
    id_exam_big_class: number;

    @IsNotEmpty()
    roomPeopleMax: number;

}
