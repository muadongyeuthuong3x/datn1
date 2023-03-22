
import { Department } from 'src/department/entities/department.entity';
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('teacher')

export class Teacher {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    id_teacher: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    phone_number: string;

    @Column()
    id_teacher_department_query: string;

    @ManyToOne(() => Department, item => item.idDepartment)
    id_teacher_department: Department;

    @ManyToOne(() => ItemRoomExamAndTeacher, item => item.id_Teacher)
    id_test_schedule_student: ItemRoomExamAndTeacher;

    @ManyToOne(() => ItemRoomExamAndTeacher, item => item.id_Teacher_mark_score)
    id_test_schedule_student_score: ItemRoomExamAndTeacher;
   

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
