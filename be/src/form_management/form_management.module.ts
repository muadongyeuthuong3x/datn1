import { Module } from '@nestjs/common';
import { FormManagementService } from './form_management.service';
import { FormManagementController } from './form_management.controller';

@Module({
  controllers: [FormManagementController],
  providers: [FormManagementService]
})
export class FormManagementModule {}
