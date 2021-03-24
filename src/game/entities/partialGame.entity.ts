import { Area } from "src/area/entities/area.entity";
import { Game } from "./game.entity";

export class PartialGame {
    id: number;
    name: string;
    notice: string;
    duration: string;
    minPlayers: number;
    maxPlayers: number;
    minAge: number;
    maxAge: number;
    isPrototype: boolean;
    publisher: number;
    gameType: String;
    area?: number;
  
    constructor(game: Game, area?: Area) {
      this.publisher = game.publisher.id;
      this.gameType = game.gameType.label;
  
      if (area) {
        this.area = area.id;
      }
      
      this.id = game.id;
      this.name = game.name;
      this.notice = game.notice;
      this.duration = game.duration;
      this.minPlayers = game.minPlayers;
      this.maxPlayers = game.maxPlayers;
      this.minAge = game.minAge;
      this.maxAge = game.maxAge;
      this.isPrototype = game.isPrototype;
    }
    
  }