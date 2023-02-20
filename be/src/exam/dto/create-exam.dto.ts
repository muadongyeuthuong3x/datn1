
import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('exam')



export class CreateExamDto {
    @IsNotEmpty()
    readonly name: string;
}
