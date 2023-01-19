import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req, BadGatewayException, Res, UseInterceptors , CacheInterceptor  } from '@nestjs/common';
import { JoiValidatePipe } from 'src/users/helpers/joi_validate.pipe';
import { BlockClassSchema } from 'src/users/helpers/validate_schema_block_class';
import { BlockClassService } from './block_class.service';
import { CreateBlockClassDto } from './dto/create-block_class.dto';
import { UpdateBlockClassDto } from './dto/update-block_class.dto';

@Controller('block-class')
export class BlockClassController {
  constructor(  private readonly blockClassService: BlockClassService ) { }

  @Post()
  @UsePipes(new JoiValidatePipe(BlockClassSchema))
  async create(@Body() createBlockClassDto: CreateBlockClassDto, @Res() res: any) {
   
    const { blockClass } = createBlockClassDto;
    try {
      const data = await this.blockClassService.findOneblockClass(blockClass);
      if (!data) {
        const dataCreate = await this.blockClassService.create(blockClass);
        return res.status(200).json({
          status: "success",
          message: dataCreate
        }); 
      } else {
        return res.status(500).json({
          status: "error",
          message: "has an block in system"
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
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    try {
      const data = await this.blockClassService.findAll();
      return data
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.blockClassService.findOne(+id);
      return data
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBlockClassDto: UpdateBlockClassDto, @Res() res: any) {
    const { blockClass } = updateBlockClassDto;
    try {
      const data = await this.blockClassService.findOneblockClassUpdate( Number(id) , blockClass);
      if(data.id == id ){
        return res.status(200).json({
          status: "success",
          message: data
        }); 
      }

      if (!data) {
        const dataUpdate = await this.blockClassService.update( Number(id) ,blockClass);
        return res.status(200).json({
          status: "success",
          message: dataUpdate
        }); 
      } else if(data) {
        return res.status(500).json({
          status: "error",
          message: "has an block in system"
        });
      }
    } catch (error) {
       return res.status(500).json({
        status: "error",
        message: "server error"
       })
    } 
   
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.blockClassService.remove(+id);
      return data
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "server error"
      })
    }
  }
}



