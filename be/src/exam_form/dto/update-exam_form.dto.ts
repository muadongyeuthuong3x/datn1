import { PartialType } from '@nestjs/swagger';
import { CreateExamFormDto } from './create-exam_form.dto';

export class UpdateExamFormDto extends PartialType(CreateExamFormDto) {}
