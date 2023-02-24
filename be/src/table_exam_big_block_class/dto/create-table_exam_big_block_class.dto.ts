import { IsNotEmpty } from 'class-validator';

export class CreateTableExamBigBlockClassDto {
  @IsNotEmpty()
  readonly time_year_start: string;

  @IsNotEmpty()
  readonly time_year_end: string;

  @IsNotEmpty()
  readonly id_big_class_exam: number[];

  @IsNotEmpty()
  id_exam: any;

  @IsNotEmpty()
  id_exam_where: number;
}
