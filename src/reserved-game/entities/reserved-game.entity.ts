import { Column } from "typeorm";

export class ReservedGame {

    @Column()
    exposed: number;

    @Column()
    donation: number;

    @Column()
    tombola: number;

    @Column()
    receiveDate: Date;

    @Column()
    needReturn: boolean;

    @Column({ default: null})
    returnDate: Date;

    @Column()
    tableCount: number;

}
