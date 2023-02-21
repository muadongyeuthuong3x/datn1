
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('teacher')

export class Teacher {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    id_teacher: string;

    @Column({ unique: true })
    name: string;

    @Column()
    avatar: string;

    @Column()
    phone_number: string;


    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

}
