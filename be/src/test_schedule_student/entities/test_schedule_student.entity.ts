
import { ItemRoomExamAndTeacher } from 'src/item-room-exam-and-teacher/entities/item-room-exam-and-teacher.entity';
import { TableExamBigBlockClass } from 'src/table_exam_big_block_class/entities/table_exam_big_block_class.entity';
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
    id_query_exam_big_class: string;

    @Column()
    form_exam: number;

    @Column()
    time_exam: number;


    @OneToMany(() => ItemRoomExamAndTeacher, (item) => item.id_testScheduleStudent, {
        onDelete: 'CASCADE',
    })
    id_itemRoomExamAndTeacher : ItemRoomExamAndTeacher

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
