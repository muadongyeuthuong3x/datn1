
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('exam')

export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
    
    @Column()
    semester: string;

    @Column()
    year_learn: string;

    @Column()
    tc_learn: number;

    @OneToMany(() => TableExamBigBlockClass, item => item.id_exam, {
        cascade: true,
    })
    exams: TableExamBigBlockClass;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
