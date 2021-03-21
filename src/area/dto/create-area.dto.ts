import { IsBoolean, IsInt, IsNotEmpty, IsString, isNotEmpty, IsUUID } from "class-validator";
export class CreateAreaDto {

    @IsString()
    @IsNotEmpty()
    label_area: string;

}
