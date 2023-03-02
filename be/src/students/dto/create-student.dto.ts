import { IsNotEmpty } from 'class-validator';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Column } from 'typeorm';

export class CreateStudentDto {
  @IsNotEmpty()
  readonly code_student: string;

  @Column()
  readonly name: string;

  @Column()
  readonly point_diligence: string;

  @Column()
  readonly point_beetween: string;

  @Column()
  readonly point_end: string;

  @Column()
  readonly point_end_end: string;

  @Column()
  readonly why_edit_point_end_end: string;

  @Column()
  readonly why_edit_point_end: string;

  @Column()
  readonly id_exam: TableExamBigBlockClass;

  @Column()
  readonly id_exam_query: string;
}
