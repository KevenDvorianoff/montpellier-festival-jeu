import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateReservedGameDto } from './create-reserved-game.dto';

export class UpdateReservedGameDto extends PartialType(
    OmitType(CreateReservedGameDto, ['reservationId', 'gameId'])
 ) {}
