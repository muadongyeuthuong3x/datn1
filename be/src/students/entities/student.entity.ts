import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code_student: string;

  @Column()
  name: string;

  @Column('numeric',{ default: 0  })
  point_diligence: number ;

  @Column('numeric',{ default: 0  })
  point_beetween: number;

  @Column('numeric',{ default: 0  })
  point_end: number;

  @Column('numeric',{ default: -1 })
  point_end_end: number;

  @Column({ default: '' })
  why_edit_point_end_end: string;

  @Column({ default: '' })
  why_edit_point_end: string;

  @Column()
  id_exam_query: string;

  @ManyToOne(() => TableExamBigBlockClass, (item) => item.id_student, {
    onDelete: 'CASCADE',
  })
  id_exam_big_class: TableExamBigBlockClass;

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt?: Date;
}
