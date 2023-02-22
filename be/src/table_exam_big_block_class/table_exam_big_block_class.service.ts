import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableExamBigBlockClassDto } from './dto/create-table_exam_big_block_class.dto';
import { UpdateTableExamBigBlockClassDto } from './dto/update-table_exam_big_block_class.dto';
import { TableExamBigBlockClass } from './entities/table_exam_big_block_class.entity';

@Injectable()
export class TableExamBigBlockClassService {

  constructor(
    @InjectRepository(TableExamBigBlockClass)
    private readonly examBigClassRepository: Repository<TableExamBigBlockClass>,
  ) { }


  async create(createTableExamBigBlockClassDto: CreateTableExamBigBlockClassDto) {

    try {
      const { id_big_block_class, id_exam, time_year_start, time_year_end } = createTableExamBigBlockClassDto;
      const dataRes :any = [];
      for (let i = 0; i < id_big_block_class?.length; i++) {
        const newData = new TableExamBigBlockClass();
        newData.id_exam = id_exam;
        newData.id_big_block_class = id_big_block_class[i];
        newData.time_year_start = time_year_start;
        newData.time_year_end = time_year_end;
        console.log(newData)
        const dataCreate=  await this.examBigClassRepository.save(newData);
        dataRes.push(dataCreate);
      }
      return dataRes;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }
  }

 async findAll() {
    try {
      return await this.examBigClassRepository.find({
        relations: {
          id_big_block_class: true,
          id_exam: true
      },
      });
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tableExamBigBlockClass`;
  }

  update(id: number, updateTableExamBigBlockClassDto: UpdateTableExamBigBlockClassDto) {
    return `This action updates a #${id} tableExamBigBlockClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableExamBigBlockClass`;
  }
}
