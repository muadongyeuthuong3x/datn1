
import { IsNotEmpty } from 'class-validator';
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
}
