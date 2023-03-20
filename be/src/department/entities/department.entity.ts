
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('department')

export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    department: string;

    @OneToMany(() => Teacher, item => item.id_teacher_department, {
        cascade: true,
    })
    idDepartment: Teacher;
}
