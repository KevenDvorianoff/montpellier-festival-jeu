import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/account/entities/account.entity";
import { Game } from "src/game/entities/game.entity";
import { Festival } from "src/festival/entities/festival.entity";
import { Price } from "src/price/entities/price.entity";
import { Area } from "src/area/entities/area.entity";
import { ReservedTable} from "src/reserved-table/entities/reserved-table.entity";


export const allEntities = [
    Account,
    Game,
    Festival,
    Price,
    Area,
    ReservedTable
];

export function databaseAccesModule() {
    return TypeOrmModule.forFeature(allEntities);
}