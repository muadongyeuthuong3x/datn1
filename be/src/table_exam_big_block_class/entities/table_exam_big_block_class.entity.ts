
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
import { Exam } from 'src/exam/entities/exam.entity';
import { TableBigClassExam } from 'src/table-big-class-exam/entities/table-big-class-exam.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('table-exam-big-block-class')
export class TableExamBigBlockClass {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time_year_start: String;

    @Column()
    time_year_end: String;



    @ManyToOne(() => Exam, (item) => item.exams)
    id_exam: Exam

    @OneToMany(() => TableBigClassExam, (item) => item.id)
    id_big_class_exam: TableBigClassExam

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
}
