import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/account/entities/account.entity";
import { Game } from "src/game/entities/game.entity";


export const allEntities = [
    Account,
    Game
];

export function databaseAccesModule() {
    return TypeOrmModule.forFeature(allEntities);
}