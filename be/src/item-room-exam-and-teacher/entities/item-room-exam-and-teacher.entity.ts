import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/students/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherMarkExamRoom } from 'src/teacher_mark_exam_room/entities/teacher_mark_exam_room.entity';
import { TeacherTrack } from 'src/teacher_track/entities/teacher_track.entity';
import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('item-room-exam-and-teacher')
export class ItemRoomExamAndTeacher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time_start: Date;

    @Column()
    time_end: Date;


    @Column()
    id_class_query: number;

    @ManyToOne(() => Class, item => item.id_ItemRoomExamAndTeacher)
    id_Class : Class;


    @OneToMany(() => Student, item => item.id_test_schedule_students,{
            onDelete: 'CASCADE',
        })
    id_student_exam: Student;

    @OneToMany(() => TeacherTrack , item => item.id_itemRoomExamAndTeacher , {
            onDelete: 'CASCADE',
        })
    id_teacherTrack: TeacherTrack;

    @OneToMany(() => TeacherMarkExamRoom , item => item.id_teacher_mark_score , {
            onDelete: 'CASCADE',
        })
    id_teacherMarkExamRoom: TeacherMarkExamRoom;


    @ManyToOne(() => TestScheduleStudent, item => item.id_itemRoomExamAndTeacher, {
        cascade: true,
    })
    id_testScheduleStudent: TestScheduleStudent;

}
