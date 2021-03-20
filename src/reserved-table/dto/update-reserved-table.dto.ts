import { PartialType } from '@nestjs/mapped-types';
import { CreateReservedTableDto } from './create-reserved-table.dto';

export class UpdateReservedTableDto extends PartialType(CreateReservedTableDto) {}
