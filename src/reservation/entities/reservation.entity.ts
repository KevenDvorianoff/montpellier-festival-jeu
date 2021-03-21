import { Company } from "src/company/entities/company.entity";
import { Festival } from "src/festival/entities/festival.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { ReservedGame } from "src/reserved-game/entities/reserved-game.entity";
import { ReservedTable } from "src/reserved-table/entities/reserved-table.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";

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

    // Relation
    @ManyToOne(() => Festival, (festival) => festival.reservations)
    festival: Festival;

    @ManyToOne(() => Company)
    company: Company;

    @OneToMany(() => ReservedTable, (reservedTable) => reservedTable.reservation)
    reservedTables: ReservedTable[];

    @OneToMany(() => ReservedGame, (reservedGame) => reservedGame.reservation)
    reservedGames: ReservedGame[];

    @OneToOne(() => Invoice, { nullable: true })
    @JoinColumn()
    invoice: Invoice;
}
