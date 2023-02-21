import { PartialType } from '@nestjs/swagger';
import { CreateFormManagementDto } from './create-form_management.dto';

export class UpdateFormManagementDto extends PartialType(CreateFormManagementDto) {}
