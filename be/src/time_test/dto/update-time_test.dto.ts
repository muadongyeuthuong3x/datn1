import { PartialType } from '@nestjs/swagger';
import { CreateTimeTestDto } from './create-time_test.dto';

export class UpdateTimeTestDto extends PartialType(CreateTimeTestDto) {}
