import { Festival } from "src/festival/entities/festival.entity";
import { ReservedTable } from "src/reserved-table/entities/reserved-table.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    // Relation
    @ManyToOne(() => Festival, (festival) => festival.prices)
    festival: Festival;

    @OneToMany(() => ReservedTable, (reservedTable) => reservedTable.price)
    reservedTables: ReservedTable[];
}