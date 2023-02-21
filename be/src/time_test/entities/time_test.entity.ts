
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
import { BigBlockClass } from 'src/big_block_class/entities/big_block_class.entity';
@Entity('time-test')

export class TimeTest {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time_start: Date;

    @Column()
    time_end: Date;

    @Column()
    readonly id_exam: Date;

    @OneToOne(() => BigBlockClass, (item) => item.id, {
        onDelete: 'CASCADE',
    })

    id_big_block_class: BigBlockClass

    @OneToOne(() => Exam, (item) => item.id, {
        onDelete: 'CASCADE',
    })

    idExam: Exam

    @Column()
    readonly id_big__block_class: Date;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
