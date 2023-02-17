import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../../enums/enum_users';

export class UpdateUserDto {

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly id: number;

    readonly password?: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly role: UserRole;


}
