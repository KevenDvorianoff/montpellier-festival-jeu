import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column('int')
    tableCount: number;

    @Column('int')
    m2Count: number;

    @Column('float')
    m2Price: number;

    @Column('float')
    tablePrice: number;
}