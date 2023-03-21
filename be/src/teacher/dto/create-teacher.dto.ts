
import { IsNotEmpty, IS_ALPHA } from 'class-validator';
import { Department } from 'src/department/entities/department.entity';
import { Entity } from 'typeorm';

@Entity('teacher')



export class CreateTeacherDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly id_teacher: string;
    @IsNotEmpty()
    readonly avatar: string;
    @IsNotEmpty()
    readonly phone_number: string;
    @IsNotEmpty()
    idDepartment : any
    @IsNotEmpty()
    id_teacher_department_query : string
}
