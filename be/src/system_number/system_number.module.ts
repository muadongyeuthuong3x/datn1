import { Module } from '@nestjs/common';
import { SystemNumberService } from './system_number.service';
import { SystemNumberController } from './system_number.controller';

@Module({
  controllers: [SystemNumberController],
  providers: [SystemNumberService]
})
export class SystemNumberModule {}
