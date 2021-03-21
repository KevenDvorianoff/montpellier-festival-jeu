import { IsNumber, IsDate } from "class-validator";

export class CreateInvoiceDto {

    @IsNumber()
    price: number;

    @IsNumber()
    discount: number;

    @IsDate()
    sentDate: Date;

}
