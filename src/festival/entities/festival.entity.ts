import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Festival {
    @PrimaryGeneratedColumn()
    id_festival: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'date' })
    date: string;

    @Column({default: false})
    isActive: boolean;
}
