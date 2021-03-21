import { Type } from "class-transformer";
import { IsNumber, IsInt, IsDate, IsBoolean, IsOptional } from "class-validator";

export class CreateReservedGameDto {
    @IsInt()
    exposed: number;

    @IsInt()
    donation: number;

    @IsInt()
    tombola: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    receiveDate?: Date;

    @IsBoolean()
    needReturn: boolean;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    returnDate?: Date;

    @IsNumber()
    tableCount: number;

    @IsNumber()
    reservationId: number;

    @IsNumber()
    gameId: number;

    @IsNumber()
    @IsOptional()
    areaId?: number;
}
