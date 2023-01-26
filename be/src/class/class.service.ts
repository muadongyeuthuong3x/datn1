import { Injectable   } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { DataSource, Repository } from 'typeorm';
import { BlockClass } from 'src/block_class/entities/block_class.entity';

@Injectable()
export class ClassService {

  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private dataSource: DataSource
  ) { }

   create(class_kma: string , blockClassId : BlockClass) {
    let newClass = new Class();
    newClass.class_kma = class_kma;
    newClass.blockClassId= blockClassId;
    return  this.classRepository.save(newClass);
  }

  async findOneClass(class_kma: string): Promise<Class> {
    const data = await this.classRepository.findOne({
      where: {
        class_kma,
      },
    });
    return data;
  }

  findAll() {
    return this.classRepository.find();
  }

  findOne(id: number) {
    return this.classRepository.findOneBy({id});
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classRepository.update(id, { class_kma: updateClassDto.class_kma ,    blockClassId: updateClassDto.blockClassId });
  }

  remove(id: number) {
    return this.classRepository.delete({ id });
  }
}
 