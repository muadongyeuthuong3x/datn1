import { IsNotEmpty } from 'class-validator';
import { Class } from 'src/class/entities/class.entity';
import { Column } from 'typeorm';

export class CreateStudentDto {
    @IsNotEmpty()
    readonly  name :string;
   
    @Column({ unique : true})
    readonly  code_student: string;

    @IsNotEmpty()
    readonly classId : Class;
   
;}
 