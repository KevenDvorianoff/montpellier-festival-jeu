import { IsBoolean, IsInt, IsNotEmpty, IsString, isNotEmpty, IsNumber } from "class-validator";

export class CreateReservedTableDto {
    @IsNumber()
    tableCount: number;

    @IsNumber()
    m2Count: number;
}
