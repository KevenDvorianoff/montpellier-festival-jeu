import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReservedGameDto } from './dto/create-reserved-game.dto';
import { UpdateReservedGameDto } from './dto/update-reserved-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservedGame } from './entities/reserved-game.entity';
import { Repository } from 'typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Area } from 'src/area/entities/area.entity';

@Injectable()
export class ReservedGameService {

  constructor(
    @InjectRepository(ReservedGame) private reservedGameRepository: Repository<ReservedGame>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    @InjectRepository(Area) private areaRepository: Repository<Area>
  ){}

  async create(createReservedGameDto: CreateReservedGameDto) {
    
    const {gameId, reservationId, areaId, ...dto} = createReservedGameDto;

    const game = await this.gameRepository.findOne(gameId);
    const reservation = await this.reservationRepository.findOne(reservationId);

    if(areaId){
      const area = await this.areaRepository.findOne(areaId);

      if(game && reservation && area){
        return this.reservedGameRepository.save({game,reservation,area, ...dto});
      }
      else {
        throw new BadRequestException();
      }
    }
    else{
      if(game && reservation){
        return this.reservedGameRepository.save({game,reservation, ...dto});
      }
      else {
        throw new BadRequestException();
      }
    }
    
  }

  findAll() {
    return this.reservedGameRepository.find({
        relations: [ 'area' ]
      }
    );
  }

  async findOne(idReservation: number, idGame: number) {
    const reservedGame = await this.reservedGameRepository.findOne({reservation: { id: idReservation }, game: { id: idGame }}, {
      relations: [ 'area' ]
    });

    if(reservedGame){
      return reservedGame;
    }
    else{
      throw new NotFoundException(`No reserved game found with reservation id ${idReservation} and game id ${idGame}`)
    }
  }

  async update(idReservation: number, idGame: number, updateReservedGameDto: UpdateReservedGameDto) {
    
    const {areaId, ...dto} = updateReservedGameDto;

    if(areaId){
      const area = await this.areaRepository.findOne(areaId);

      if(area){
        const result = await this.reservedGameRepository.update({reservation: { id: idReservation }, game: { id: idGame }}, {area, ...dto});
        if (result.affected === 0) {
          throw new NotFoundException();
        }
        return result;
      }
      else{
        throw new BadRequestException();
      }
    }
    else{
      const result = await this.reservedGameRepository.update([idReservation, idGame], updateReservedGameDto);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
      return result;
    }
  }

  async remove(idReservation: number, idGame: number) {
    const result = await this.reservedGameRepository.delete({reservation: { id: idReservation }, game: { id: idGame }});
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
  findGamesForAreas(id:number) {
    return this.reservedGameRepository.createQueryBuilder('reserved_game')
    .leftJoin('reserved_game.area', 'area')
    .leftJoin('reserved_game.game', 'game')
    .where('area.id = :id', {id:id})
    .select('game.name', 'name')
    .distinct(true)
    .getRawMany();
  }
} 
