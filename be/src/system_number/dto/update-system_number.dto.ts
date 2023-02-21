import { PartialType } from '@nestjs/swagger';
import { CreateSystemNumberDto } from './create-system_number.dto';

export class UpdateSystemNumberDto extends PartialType(CreateSystemNumberDto) {}
