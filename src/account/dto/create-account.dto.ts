import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isAdmin: boolean;
}
