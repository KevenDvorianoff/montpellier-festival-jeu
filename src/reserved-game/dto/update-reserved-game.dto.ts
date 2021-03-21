import { PartialType } from '@nestjs/mapped-types';
import { CreateReservedGameDto } from './create-reserved-game.dto';
import { IsDate } from 'class-validator';

export class UpdateReservedGameDto extends PartialType(CreateReservedGameDto) {

    @IsDate()
    returnDate: Date;
}
