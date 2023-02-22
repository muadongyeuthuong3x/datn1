
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('table-exam-big-block-class')
export class TableBigClassExam {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => BigBlockClass, (item) => item.id)
     id_big_block_class: BigBlockClass

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
}
