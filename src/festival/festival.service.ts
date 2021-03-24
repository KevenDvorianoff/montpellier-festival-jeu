import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from './entities/festival.entity';
import { Repository } from 'typeorm';
import { PartialGame } from 'src/game/entities/partialGame.entity';


@Injectable()
export class FestivalService {

  constructor(@InjectRepository(Festival) private festivalRepository: Repository<Festival>) {}
  
  create(createFestivalDto: CreateFestivalDto) {
    return this.festivalRepository.save(createFestivalDto);
  }

  findAll() {
    return this.festivalRepository.find();
  }

  async findOne(id: number) {
    const festival = await this.festivalRepository.findOne(id);
    if (festival) {
      return festival;
    }
    else {
      throw new NotFoundException(`No festival found with id ${id}`);
    }
  }

  async findGamesForCurrentFestival() {

    const games = await this.festivalRepository.findOne({
      where : {
        isActive: true
      },
      relations : [
        'reservations',
        'reservations.reservedGames',
        'reservations.reservedGames.area',
        'reservations.reservedGames.game',
        'reservations.reservedGames.game.publisher',
        'reservations.reservedGames.game.gameType'
      ]
    })

    let res: PartialGame[] = [];
    games.reservations
    .forEach(reservation => reservation.reservedGames
      .forEach(reservedGame => {
        if (reservedGame.area) {
          const game = new PartialGame(reservedGame.game, reservedGame.area);
          res.push(game)
        }
        else {
          const game = new PartialGame(reservedGame.game);
          res.push(game)
        }
      })
    );

    return res;
  }

  update(id: number, updateFestivalDto: UpdateFestivalDto) {
    return this.festivalRepository.update(id,updateFestivalDto);
  }

  remove(id: number) {
    return this.festivalRepository.delete(id);
  }
}
