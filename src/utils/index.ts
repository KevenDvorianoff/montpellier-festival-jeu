import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/account/entities/account.entity";
import { Game } from "src/game/entities/game.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { ReservedGame } from "src/reserved-game/entities/reserved-game.entity";


export const allEntities = [
    Account,
    Game,
    Reservation,
    Invoice,
    ReservedGame
];

export function databaseAccesModule() {
    return TypeOrmModule.forFeature(allEntities);
}