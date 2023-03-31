
import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('exam')



export class CreateExamDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly semester: string;

    @IsNotEmpty()
    readonly year_learn: string;

    @IsNotEmpty()
    readonly tc_learn: number;
    

    
}
