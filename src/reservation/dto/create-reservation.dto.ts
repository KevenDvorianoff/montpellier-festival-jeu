import { Type } from "class-transformer";
import { IsBoolean, IsString, IsDate, IsNotEmpty } from "class-validator";

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
}
