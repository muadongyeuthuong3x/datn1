import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RoomData } from '../../enums/enum_users';
@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: RoomData,
    default: RoomData.r1,
  })
  form_room: RoomData;

  @OneToMany(() => ItemRoomExamAndTeacher, (item) => item.id_Room, {
    cascade: true,
  })
  id_ItemRoomExamAndTeacher: number;

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt?: Date;
}
