
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity('table-big-class-exam')
export class TableBigClassExam {
    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(() => BigBlockClass, () => BigBlockClass, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    id_big_class_exam: BigBlockClass


    @ManyToOne(() => TableExamBigBlockClass, (item) => item.id_big_class_exam, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    id_exam_big_block_class: TableExamBigBlockClass

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
}
