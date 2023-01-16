import { IsNotEmpty } from 'class-validator';

export class CreateBlockClassDto {
    @IsNotEmpty()
    readonly blockClass: string;
}
