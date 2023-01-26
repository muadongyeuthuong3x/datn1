import { BlockClass } from 'src/block_class/entities/block_class.entity';
import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn ,UpdateDateColumn ,ManyToOne  } from 'typeorm';

@Entity('class')

export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique : true})
    class_kma: string;

    @CreateDateColumn({ name: 'created_at', default: new Date() })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', default: new Date() })
    updatedAt?: Date;

    @ManyToOne(() => BlockClass, (item) => item.class,{
        onDelete: 'CASCADE',
    })
    blockClassId : BlockClass
}
 