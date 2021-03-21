import { Column, Entity } from "typeorm";

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
}
