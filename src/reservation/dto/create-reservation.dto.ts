import { Type } from "class-transformer";
import { IsBoolean, IsString, IsDate, IsNumber, IsOptional } from "class-validator";

export class CreateReservationDto {
    @IsString()
    comment: string;

    @IsBoolean()
    needVolunteers: boolean;

    @IsBoolean()
    isPresent: boolean;

    @IsBoolean()
    isPlaced: boolean;

    @IsDate()
    @Type(() => Date)
    reservationDate: Date;

    @IsNumber()
    festivalId: number;

    @IsNumber()
    companyId: number;

    @IsNumber()
    @IsOptional()
    invoiceId?: number;
}
