import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateReservedTableDto } from './create-reserved-table.dto';

export class UpdateReservedTableDto extends PartialType(
    OmitType(CreateReservedTableDto, ['reservationId', 'priceId'])
 ) {}
