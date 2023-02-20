import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadGatewayException } from '@nestjs/common';
import { BigBlockClassService } from './big_block_class.service';
import { CreateBigBlockClassDto } from './dto/create-big_block_class.dto';
import { UpdateBigBlockClassDto } from './dto/update-big_block_class.dto';

@Controller('big-block-class')
export class BigBlockClassController {
  constructor(private readonly bigBlockClassService: BigBlockClassService) { }

  @Post()
  async create(@Body() createBigBlockClassDto: CreateBigBlockClassDto, @Res() res: any) {
    const { bigBlockClass } = createBigBlockClassDto;
    try {
      const data = await this.bigBlockClassService.findOneBigBlockClass(bigBlockClass);
      if (!data) {
        const dataCreate = await this.bigBlockClassService.create(bigBlockClass);
        return res.status(200).json({
          status: "success",
          message: dataCreate
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: "Đã tồn tại khối trong hệ thống"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "server error"
      })
    }
  }

  @Get()
  findAll() {
    return this.bigBlockClassService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.bigBlockClassService.findOne(id);
      return data;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBigBlockClassDto: UpdateBigBlockClassDto, @Res() res: any) {
    const { bigBlockClass } = updateBigBlockClassDto
    try {
      const data = await this.bigBlockClassService.findOneBigBlockClass(bigBlockClass);
      if (!!data && (data.id !== +id)) {
        throw new BadGatewayException({
          status: "error",
          message: "Đã tồn tại khối này trong hệ thống"
        })
      } else {
        await this.bigBlockClassService.update(+id, updateBigBlockClassDto.bigBlockClass);
        return res.status(200).json({
          status: "success",
          message: "sửa thành công "
        })
      }
    } catch (error) {
      console.log(error)
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }

  }


  @Post('/search')
  async findBigBlockClass(@Body() data: { bigBlockClass: string }) {
    return this.bigBlockClassService.findBigBlockClassService(data.bigBlockClass);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bigBlockClassService.remove(+id);
  }
}
