import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAreaDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsNumber()
    festivalId: number;
}
