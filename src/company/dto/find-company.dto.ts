import { Transform, Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class FindCompanyDto {
    @IsOptional()
    @IsBoolean()
    @Transform(({value}) => /true/i.test(value))
    isPublisher?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({value}) => /true/i.test(value))
    isExhibitor?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({value}) => /true/i.test(value))
    isActive?: boolean;
}