

import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';
import { RoomData } from '../../enums/enum_users';
@Entity('room')


export class CreateRoomDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly form_room: RoomData;
}
