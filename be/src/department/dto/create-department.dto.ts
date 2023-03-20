import { IsNotEmpty } from "class-validator";
import { Teacher } from "src/teacher/entities/teacher.entity";

export class CreateDepartmentDto {
    @IsNotEmpty()
    readonly department : string;

    @IsNotEmpty()
    readonly teacherId : Teacher;
}
