import { PartialType } from '@nestjs/swagger';
import { CreateBlockClassDto } from './create-block_class.dto';

export class UpdateBlockClassDto extends PartialType(CreateBlockClassDto) {}
 