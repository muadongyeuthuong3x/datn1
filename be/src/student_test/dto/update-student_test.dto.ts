import { PartialType } from '@nestjs/swagger';
import { CreateStudentTestDto } from './create-student_test.dto';

export class UpdateStudentTestDto extends PartialType(CreateStudentTestDto) {}
