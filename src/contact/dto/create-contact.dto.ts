import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsBoolean()
    isPrincipal: boolean;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    personalPhone: string;

    @IsString()
    @IsNotEmpty()
    workPhone: string;

    @IsString()
    @IsNotEmpty()
    street: string;
    
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postalCode: string;

    @IsString()
    @IsNotEmpty()
    function: string;
}
