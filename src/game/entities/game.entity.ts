import { Company } from "src/company/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    notice: string;

    @Column()
    duration: string;

    @Column('int')
    minPlayers: number;

    @Column('int')
    maxPlayers: number;

    @Column('int')
    minAge: number;

    @Column('int')
    maxAge: number;

    @Column({ default: false })
    isPrototype: boolean;

    @Column()
    lastModification: Date;

    @Column()
    gameType: string

    // Relation
    @ManyToOne(() => Company, (publisher) => publisher.games)
    publisher: Company;
}
