
import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('teacher')



export class CreateTestScheduleStudentDto {
    @IsNotEmpty()
    readonly form_exam: string;
    @IsNotEmpty()
    readonly form_exam : string;
    @IsNotEmpty()
    readonly avatar: string;
    @IsNotEmpty()
    readonly phone_number: string;
    @IsNotEmpty()
    idDepartment : any
    @IsNotEmpty()
    id_teacher_department_query : string
}
