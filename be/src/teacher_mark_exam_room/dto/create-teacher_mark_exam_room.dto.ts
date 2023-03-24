import { IsNotEmpty } from "class-validator";

export class CreateTeacherMarkExamRoomDto {

    @IsNotEmpty()
    readonly teacher: number;

    @IsNotEmpty()
    readonly idDataCreate: number;
}
