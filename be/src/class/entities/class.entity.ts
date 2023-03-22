import { BlockClass } from 'src/block_class/entities/block_class.entity';
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { Student } from 'src/students/entities/student.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  class_kma: string;


  @ManyToOne(() => ItemRoomExamAndTeacher, item => item.id_Class, {
    cascade: true,
  })
  id_test_schedule_student : ItemRoomExamAndTeacher;


  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt?: Date;

  @ManyToOne(() => BlockClass, (item) => item.class, {
    onDelete: 'CASCADE',
  })
  blockClassId: BlockClass;

  student: Student[];
}
