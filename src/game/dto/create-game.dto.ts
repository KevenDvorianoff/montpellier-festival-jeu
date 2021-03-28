import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, IsDate, IsUrl } from "class-validator";
import { Type } from "class-transformer";

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    notice: string;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsInt()
    minPlayers: number;

    @IsInt()
    maxPlayers: number;

    @IsInt()
    minAge: number;

    @IsInt()
    maxAge: number;

    @IsBoolean()
    isPrototype: boolean;

    @IsDate()
    @Type(() => Date)
    lastModification: Date;

    @IsNumber()
    publisherId: number;

    @IsString()
    @IsNotEmpty()
    gameType: string;

}
