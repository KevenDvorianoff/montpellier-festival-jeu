import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsBoolean()
    isPublisher: boolean;

    @IsBoolean()
    isExhibitor: boolean;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
