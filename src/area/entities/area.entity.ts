import { Festival } from "src/festival/entities/festival.entity";
import { ReservedGame } from "src/reserved-game/entities/reserved-game.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    // Relation
    @ManyToOne(() => Festival, (festival) => festival.areas)
    festival: Festival;
}
