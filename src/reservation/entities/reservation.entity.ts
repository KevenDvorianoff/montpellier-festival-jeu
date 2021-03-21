import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    needVolonteers: boolean;

    @Column({ default: false})
    isPresent: boolean;

    @Column({ default: false})
    isPlaced: boolean;

    @Column()
    reservationDate: Date;

}
