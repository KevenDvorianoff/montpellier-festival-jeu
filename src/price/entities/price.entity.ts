import { Festival } from "src/festival/entities/festival.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    // Foreign key
    @Column()
    festivalId: number;

    // Relation
    @ManyToOne(() => Festival, (festival) => festival.prices)
    festival: Festival;
}