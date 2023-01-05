import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn ,UpdateDateColumn } from 'typeorm';
import {  IsNotEmpty } from 'class-validator';
import {UserRole} from '../../enums/enum_users';

@Entity('users')

export  class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type : 'enum',
        enum :UserRole,
        default : UserRole._KMA
    })
    role: UserRole;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
     
}
