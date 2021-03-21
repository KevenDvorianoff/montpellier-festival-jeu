import { Price } from "src/price/entities/price.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservedTable {
    @Column('float')
    tableCount: number;

    @Column('float')
    m2Count: number;

    // Foreign key
    @Column({ primary: true })
    priceId: number;

    @Column({ primary: true })
    reservationId: number;

    // Relation
    @ManyToOne(() => Price, { primary: true })
    price: Price;

    @ManyToOne(() => Reservation, (reservation) => reservation.reservedTables, { primary: true })
    reservation: Reservation;
}
