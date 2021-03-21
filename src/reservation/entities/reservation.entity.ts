import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    comment: string;

    @Column()
    needVolonteers: boolean;

    @Column()
    isPresent: boolean;

    @Column()
    isPlaced: boolean;

    @Column()
    reservationDate: Date;
}
