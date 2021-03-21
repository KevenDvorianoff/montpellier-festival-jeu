import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;
}
