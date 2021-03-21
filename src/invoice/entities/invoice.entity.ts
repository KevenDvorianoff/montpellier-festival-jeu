import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    price: number;

    @Column('float')
    discount: number;

    @Column({ nullable: true })
    sentDate: Date;

    @Column({ nullable: true })
    paymentDate: Date;
}
