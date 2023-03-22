
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/students/entities/student.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('test-schedule-student')

export class TestScheduleStudent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomPeopleMax: string;
    
    @Column()
    mode: number;

    @Column()
    id_query_exam_big_class: TableExamBigBlockClass;

    @Column()
    time_exam: number;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
