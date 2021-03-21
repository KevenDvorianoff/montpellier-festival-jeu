import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Festival {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    date: Date;

    @Column({ default: false })
    isActive: boolean;
}
