import { IsBoolean, IsString, IsDate } from "class-validator";

export class CreateReservationDto {

    @IsString()
    comment: string;

    @IsBoolean()
    needVolunteers: boolean;

    @IsDate()
    reservationDate: Date;

}
