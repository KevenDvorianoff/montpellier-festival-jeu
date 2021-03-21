import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id_price: number;

    @Column()
    label: string;

    @Column()
    tableCount: number;

    @Column()
    m2Count: number;

    @Column()
    m2Price: number;

    @Column()
    tablePrice: number;


}