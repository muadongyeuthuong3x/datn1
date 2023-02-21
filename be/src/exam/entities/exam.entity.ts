
import { TimeTest } from 'src/time_test/entities/time_test.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('exam')

export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;


    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
   

    

}
