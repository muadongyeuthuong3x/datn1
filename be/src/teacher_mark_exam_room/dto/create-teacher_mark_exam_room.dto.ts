import { IsNotEmpty } from "class-validator";

export class CreateTeacherMarkExamRoomDto {

    @IsNotEmpty()
    readonly list_teacher: number[];

    @IsNotEmpty()
    readonly idDataCreate: number;
}
