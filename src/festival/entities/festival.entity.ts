import { Area } from "src/area/entities/area.entity";
import { Price } from "src/price/entities/price.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

export const UNIQUE_FESTIVAL_NAME = 'UNIQUE_FESTIVAL_NAME'

@Entity()
@Unique(UNIQUE_FESTIVAL_NAME, ['name'])
export class Festival {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    date: Date;

    @Column({ default: false })
    isActive: boolean;

    // Relation
    @OneToMany(() => Price, (price) => price.festival)
    prices: Price[];

    @OneToMany(() => Area, (area) => area.festival)
    areas: Area[];

    @OneToMany(() => Reservation, (reservation) => reservation.festival)
    reservations: Reservation[];
}
