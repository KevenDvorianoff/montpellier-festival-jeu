import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isAdmin: boolean;
}
