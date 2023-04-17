import { Department } from 'src/department/entities/department.entity';
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TestScheduleStudent } from 'src/test_schedule_student/entities/test_schedule_student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('teacher-track')
export class TeacherTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_teacher_track_query: string;

  @Column()
  id_room_query: string;

  @ManyToOne(() => ItemRoomExamAndTeacher, (item) => item.id_teacherTrack, {
    onDelete: 'CASCADE',
  })
  id_itemRoomExamAndTeacher: number;

  @ManyToOne(() => Teacher, (item) => item.id_teacherTrack)
  id_Teacher: Teacher;
}
