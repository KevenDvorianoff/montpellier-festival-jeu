import { Game } from "src/game/entities/game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    // Relation
    @OneToMany(() => Game, (game) => game.gameType)
    games: Game[];
}
