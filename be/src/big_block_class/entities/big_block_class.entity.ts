import { BlockClass } from "src/block_class/entities/block_class.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';



@Entity('big-block-class')
export class BigBlockClass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    bigBlockClass: string;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

    @OneToMany(() => BlockClass, (item) => item.bigBlockClassID, {
        onDelete: 'CASCADE',
    })
    blockClassList: BlockClass[]
}
