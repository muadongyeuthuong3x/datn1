import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {UserRole} from '../../enums/enum_users';

@Entity('users')

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @Column({
        type : 'enum',
        enum :UserRole,
        default : UserRole._KMA
    })
    role: UserRole;
     
}
