import { BlockClass } from "src/block_class/entities/block_class.entity";
import { TableExamBigBlockClass } from "src/table_exam_big_block_class/entities/table_exam_big_block_class.entity";
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

    @OneToMany(() => TableExamBigBlockClass, item => item.id_big_block_class, {
        cascade: true,
    })
    bigClasss: TableExamBigBlockClass[];

    blockClassList: BlockClass[]
}
