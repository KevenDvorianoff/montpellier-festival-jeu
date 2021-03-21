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
}
