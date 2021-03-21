import { PrimaryColumn, Column } from "typeorm";

export class Invoice {

    @PrimaryColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    discount: number;

    @Column()
    sentDate: Date;

    @Column({ default: null})
    paymentDate: Date;
}
