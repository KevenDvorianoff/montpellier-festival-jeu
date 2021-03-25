import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/account/entities/account.entity";
import { Company } from "src/company/entities/company.entity";
import { Contact } from "src/contact/entities/contact.entity";
import { GameType } from "src/game-type/entities/game-type.entity";
import { Game } from "src/game/entities/game.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { ReservedGame } from "src/reserved-game/entities/reserved-game.entity";
import { Festival } from "src/festival/entities/festival.entity";
import { Price } from "src/price/entities/price.entity";
import { Area } from "src/area/entities/area.entity";
import { ReservedTable} from "src/reserved-table/entities/reserved-table.entity";


export const allEntities = [
    Account,
    Game,
    Reservation,
    Invoice,
    ReservedGame,
    Festival,
    Price,
    Area,
    ReservedTable,
    Company,
    Contact,
    GameType

];

export function databaseAccessModule() {
    return TypeOrmModule.forFeature(allEntities);
}

export function isConstraint(e: any, constraintName: string) {
    return e && e.constraint === constraintName;
}