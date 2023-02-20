

import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('exam-form')



export class CreateExamFormDto {
    @IsNotEmpty()
    readonly name: string;
}
