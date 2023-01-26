import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UsePipes } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JoiValidatePipe } from 'src/users/helpers/joi_validate.pipe';
import { ClassSchema } from 'src/users/helpers/validate_schema_class';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) { }


  @Post()
  @UsePipes(new JoiValidatePipe(ClassSchema))
  async create(@Body() createClassDto: CreateClassDto, @Res() res: any) {

    const { class_kma, blockClassId } = createClassDto;
    try {
      const data = await this.classService.findOneClass(class_kma);
      if (!data) {
        const dataCreate = await this.classService.create(class_kma, blockClassId);
        return res.status(200).json({
          status: "success",
          message: dataCreate
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: "has an class in system"
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
  async findAll(@Res() res: any) {
    try {
      const data = await this.classService.findAll();
      return res.status(200).json({
        status: "success",
        message: data
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "server error"
      })
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: any) {
    try {
      const data = await this.classService.findOne(+id);
      return res.status(200).json({
        status: "success",
        message: data
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "server error"
      })
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto, @Res() res: any) {
    try {
      const dataFind = await this.classService.findOne(+id);
      if(dataFind.class_kma  === updateClassDto.class_kma && dataFind.id === +id){
        return res.status(200).json({
          status: "success",
          message: dataFind
        });
      }else if (dataFind.class_kma === updateClassDto.class_kma  && dataFind.id !== +id){
        return res.status(500).json({
          status: "error",
          message: "class already exits in the system "
        });
      }
      const data = await this.classService.update(+id, updateClassDto);
      return res.status(200).json({
        status: "success",
        message: data
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "server error"
      })
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: any) {
    try {
      const data = await this.classService.remove(+id);
      return res.status(200).json({
        status: "success",
        message: data
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "server error"
      })
    }

  }
}
 