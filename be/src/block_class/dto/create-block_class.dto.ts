import { IsNotEmpty } from 'class-validator';
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';

export class CreateBlockClassDto {
    @IsNotEmpty()
    readonly blockClass: string;

    @IsNotEmpty()
    readonly bigBlockClassID: BigBlockClass;
}
 