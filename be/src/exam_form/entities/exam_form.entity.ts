import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('exam-form')
export class ExamForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    

    
    @OneToMany(() => TestScheduleStudent, (item) => item.id_ExamForm, {
        onDelete: 'CASCADE',
    })

    id_testScheduleStudentExamForm : TestScheduleStudent

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
}
