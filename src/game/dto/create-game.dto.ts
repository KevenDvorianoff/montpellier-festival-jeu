import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
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

    @IsNumber()
    publisherId: number;

    @IsNumber()
    gameTypeId: number;
}
