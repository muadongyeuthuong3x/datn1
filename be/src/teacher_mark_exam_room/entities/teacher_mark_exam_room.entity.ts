
import { Department } from 'src/department/entities/department.entity';
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('teacher-mark-exam-room')

export class TeacherMarkExamRoom {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_teacher_mark_query : string;
    
    @ManyToOne(() => Teacher, item => item.id_teacherMarkExamRoom)
    id_teacher_mark_score : number;

    @ManyToOne(() => ItemRoomExamAndTeacher, item => item.id_teacher_mark_exam,{
        onDelete: 'CASCADE',
    })
    id_item_room_exam : number; 
}
