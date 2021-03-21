import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservedTable {
    @Column('float')
    tableCount: number;

    @Column('float')
    m2Count: number;
}
