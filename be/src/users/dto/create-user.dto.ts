import { IsNotEmpty } from 'class-validator';
import {UserRole} from '../../enums/enum_users';


export class CreateUserDto {

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly role: UserRole;


}

 