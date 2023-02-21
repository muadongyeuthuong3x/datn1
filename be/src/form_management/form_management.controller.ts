import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormManagementService } from './form_management.service';
import { CreateFormManagementDto } from './dto/create-form_management.dto';
import { UpdateFormManagementDto } from './dto/update-form_management.dto';

@Controller('form-management')
export class FormManagementController {
  constructor(private readonly formManagementService: FormManagementService) {}

  @Post()
  create(@Body() createFormManagementDto: CreateFormManagementDto) {
    return this.formManagementService.create(createFormManagementDto);
  }

  @Get()
  findAll() {
    return this.formManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormManagementDto: UpdateFormManagementDto) {
    return this.formManagementService.update(+id, updateFormManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formManagementService.remove(+id);
  }
}
