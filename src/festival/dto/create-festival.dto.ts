import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, IsDate } from "class-validator";

export class CreateFestivalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsBoolean()
    isActive: boolean;
}
