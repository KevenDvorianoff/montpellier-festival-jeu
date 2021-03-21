import { Contact } from "src/contact/entities/contact.entity";
import { Game } from "src/game/entities/game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    isPublicher: boolean;

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
