import { Exam } from 'src/exam/entities/exam.entity';
import { Student } from 'src/students/entities/student.entity';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';
import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('table-exam-big-block-class')
export class TableExamBigBlockClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time_year_start: string;

  @Column()
  time_year_end: string;

  @Column()
  id_exam_where: string;

  @ManyToOne(() => Exam, (item) => item.exams)
  @JoinColumn()
  id_exam: Exam;

  @OneToMany(() => TableBigClassExam, (item) => item.id_exam_big_block_class, {
    onDelete: 'CASCADE',
  })
  id_big_class_exam: TableBigClassExam;

  @OneToMany(() => Student, (item) => item.id_exam_big_class, {
    onDelete: 'CASCADE',
  })
  id_student: TableBigClassExam;

  @OneToMany(() => TestScheduleStudent, (item) => item.id_tableExamBigBlockClass, {
    onDelete: 'CASCADE',
  })
  id_testScheduleStudent: TestScheduleStudent;

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt?: Date;
}
