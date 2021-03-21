import { Type } from "class-transformer";
import { IsNumber, IsDate, IsOptional } from "class-validator";

export class CreateInvoiceDto {
    @IsNumber()
    price: number;

    @IsNumber()
    discount: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    sentDate?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    paymentDate?: Date;
}
