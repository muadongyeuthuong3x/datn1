
import { IsNotEmpty } from "class-validator";
import { ItemRoomExamAndTeacher } from "src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { TestScheduleStudent } from "src/test_schedule_student/entities/test_schedule_student.entity";


export class CreateTeacherTrackDto {
     
    @IsNotEmpty()
    readonly list_teacher: number[];

    @IsNotEmpty()
    readonly idDataCreate: number;
}
