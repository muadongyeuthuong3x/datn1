import { Class } from "src/class/entities/class.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('student')

export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique : true})
    name: string;

    @Column({ unique : true})
    code_student: string;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

    @ManyToOne(() => Class, (item) => item.student , {
        onDelete: 'CASCADE',
    })
    classId: Class
}
 