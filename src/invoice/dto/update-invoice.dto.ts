import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsDate } from 'class-validator';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {

    @IsDate()
    paymentDate: Date;
}
