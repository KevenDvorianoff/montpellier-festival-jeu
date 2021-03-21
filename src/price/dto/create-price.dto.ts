import { IsInt, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreatePriceDto { 
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsInt()
    tableCount: number;

    @IsInt()
    m2Count: number;

    @IsNumber()
    m2Price: number;

    @IsNumber()
    tablePrice: number;

    @IsNumber()
    festivalId: number;
}
