import { PartialType } from '@nestjs/swagger';
import { CreateBigBlockClassDto } from './create-big_block_class.dto';

export class UpdateBigBlockClassDto extends PartialType(CreateBigBlockClassDto) {}
