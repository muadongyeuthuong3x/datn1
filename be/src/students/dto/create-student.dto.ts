import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    readonly  name :string;
   
    @IsNotEmpty()
    readonly  code_student: string
   
;}
 