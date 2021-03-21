import { PartialType } from '@nestjs/mapped-types';
import { CreateReservedGameDto } from './create-reserved-game.dto';

export class UpdateReservedGameDto extends PartialType(CreateReservedGameDto) {}
