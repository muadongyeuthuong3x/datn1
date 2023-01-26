import { IsNotEmpty } from 'class-validator';
import { BlockClass } from 'src/block_class/entities/block_class.entity';

export class CreateClassDto {
    @IsNotEmpty()
    readonly class_kma : string;

    @IsNotEmpty()
    readonly blockClassId : BlockClass;

}
 