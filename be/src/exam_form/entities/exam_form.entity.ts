import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('exam-form')
export class ExamForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
}
