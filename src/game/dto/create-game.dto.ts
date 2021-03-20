import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    notice: String;

    @IsString()
    @IsNotEmpty()
    duration: String;

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
}
