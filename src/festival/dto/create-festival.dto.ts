import { IsBoolean, IsNotEmpty, IsString, IsDate } from "class-validator";

export class CreateFestivalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    date: string;

    @IsBoolean()
    isActive: boolean;
}
