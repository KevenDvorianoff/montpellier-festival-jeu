import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservedTable {
    @Column()
    tableCount: number;

    @Column()
    m2Count: number;
}
