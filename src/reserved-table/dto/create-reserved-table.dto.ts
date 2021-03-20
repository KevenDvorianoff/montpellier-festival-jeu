import { IsBoolean, IsInt, IsNotEmpty, IsString, isNotEmpty, IsNumber } from "class-validator";

export class CreateReservedTableDto {
    @IsInt()
    tableCount: number;

    @IsInt()
    m2Count: number;
}
