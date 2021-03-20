import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id_area: number;

    @Column()
    label_area: string;
}
