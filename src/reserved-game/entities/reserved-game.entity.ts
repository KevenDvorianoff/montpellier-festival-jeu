import { Area } from "src/area/entities/area.entity";
import { Game } from "src/game/entities/game.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ReservedGame {
    @Column('int')
    exposed: number;

    @Column('int')
    donation: number;

    @Column('int')
    tombola: number;

    @Column({ nullable: true })
    receiveDate: Date;

    @Column()
    needReturn: boolean;

    @Column({ nullable: true })
    returnDate: Date;

    @Column('float')
    tableCount: number;

    // Foreign key
    @Column({ primary: true })
    reservationId: number;

    @Column({ primary: true })
    gameId: number;

    @Column({ nullable: true })
    areaId: number;

    // Relation
    @ManyToOne(() => Reservation, (reservation) => reservation.reservedGames, { primary: true })
    reservation: Reservation;

    @ManyToOne(() => Game, { primary: true })
    game: Game;

    @ManyToOne(() => Area, { nullable: true })
    area: Area;
}
