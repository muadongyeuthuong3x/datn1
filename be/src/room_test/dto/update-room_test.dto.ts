import { PartialType } from '@nestjs/swagger';
import { CreateRoomTestDto } from './create-room_test.dto';

export class UpdateRoomTestDto extends PartialType(CreateRoomTestDto) {}
