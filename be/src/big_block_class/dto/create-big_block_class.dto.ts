import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('big-block-class')

export class CreateBigBlockClassDto {
    @IsNotEmpty()
    readonly bigBlockClass: string;
}
