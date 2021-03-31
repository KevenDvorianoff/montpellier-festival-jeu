import { Contact } from "src/contact/entities/contact.entity";
import { Game } from "src/game/entities/game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

export const UNIQUE_COMPANY_NAME = 'UNIQUE_COMPANY_NAME'

@Unique(UNIQUE_COMPANY_NAME, ['name'])
@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    isPublisher: boolean;

    @Column()
    isExhibitor: boolean;

    @Column({ default: true })
    isActive: boolean;

    // Relations
    @OneToMany(() => Contact, (contact) => contact.company)
    contacts: Contact[];

    @OneToMany(() => Game, (game) => game.publisher)
    games: Game[];
}
