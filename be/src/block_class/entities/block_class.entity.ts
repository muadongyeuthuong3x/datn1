import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn ,UpdateDateColumn } from 'typeorm';

@Entity('block_class')

export class BlockClass {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    blockClass: string;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;
}
