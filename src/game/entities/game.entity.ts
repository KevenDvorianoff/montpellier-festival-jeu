import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    minPlayers: number;

    @Column()
    maxPlayers: number;

    @Column()
    minAge: number;

    @Column()
    maxAge: number;

    @Column({ default: false })
    isPrototype: boolean;
}
