import { IsNumber, IsInt, IsDate, IsBoolean } from "class-validator";

export class CreateReservedGameDto {

    @IsInt()
    exposed: number;

    @IsInt()
    donation: number;

    @IsInt()
    tombola: number;

    @IsDate()
    receiveDate: Date;

    @IsBoolean()
    needReturn: boolean;

    @IsNumber()
    tableCount: number;
}
