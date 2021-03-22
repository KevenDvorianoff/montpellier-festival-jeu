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
    return this.reservedGameRepository.find();
  }

  async findOne(id: number) {
    const reservedGame = await this.reservedGameRepository.findOne(id);

    if(reservedGame){
      return reservedGame;
    }
    else{
      throw new NotFoundException(`No reserved game found with id ${id}`)
    }
  }

  async update(id: number, updateReservedGameDto: UpdateReservedGameDto) {
    
    const {areaId, ...dto} = updateReservedGameDto;

    if(areaId){
      const area = await this.areaRepository.findOne(areaId);

      if(area){
        return this.reservedGameRepository.update(id,{area, ...dto});
      }
      else{
        throw new BadRequestException();
      }
    }
    else{
      return this.reservedGameRepository.update(id, updateReservedGameDto);
    }
  }

  remove(id: number) {
    return this.reservedGameRepository.delete(id);
  }
} 
