import { IsNotEmpty, IsString } from "class-validator";

export class CreateAreaDto {
    @IsString()
    @IsNotEmpty()
    label: string;
}
