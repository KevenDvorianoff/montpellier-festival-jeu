import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/account/entities/account.entity";
import { Company } from "src/company/entities/company.entity";
import { Contact } from "src/contact/entities/contact.entity";
import { GameType } from "src/game-type/entities/game-type.entity";
import { Game } from "src/game/entities/game.entity";


export const allEntities = [
    Account,
    Game,
    Company,
    Contact,
    GameType
];

export function databaseAccessModule() {
    return TypeOrmModule.forFeature(allEntities);
}