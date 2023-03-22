import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/students/entities/student.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';



export class ItemRoomExamAndTeacher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time_start: Date;

    @Column()
    time_end: Date;

    @Column()
    id_class_query: string;

    @ManyToOne(() => Class, item => item.id_test_schedule_student, {
        cascade: true,
    })
    id_Class: Class;
    
    
    @Column()
    id_teacher_query: string;

    @OneToMany(() => Student, item => item.id_test_schedule_student, {
        cascade: true,
    })
    id_student_exam: Student;


    @ManyToOne(() => Teacher, item => item.id_test_schedule_student, {
        cascade: true,
    })
    id_Teacher: Teacher;

    @ManyToOne(() => Teacher, item => item.id_test_schedule_student_score, {
        cascade: true,
    })
    id_Teacher_mark_score: Teacher;

}
