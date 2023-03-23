
import { Department } from 'src/department/entities/department.entity';
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { TeacherMarkExamRoom } from 'src/teacher_mark_exam_room/entities/teacher_mark_exam_room.entity';
import { TeacherTrack } from 'src/teacher_track/entities/teacher_track.entity';
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

    @OneToMany(() => TeacherTrack, item => item.id_Teacher)
    id_teacherTrack: TeacherTrack;

   
    @OneToMany(() => TeacherMarkExamRoom, item => item.id_teacher_mark_score)
    id_teacherMarkExamRoom: TeacherMarkExamRoom;
   

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
