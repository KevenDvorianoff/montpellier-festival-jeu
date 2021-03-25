import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export const UNIQUE_USERNAME = 'UNIQUE_USERNAME'

@Entity()
@Unique(UNIQUE_USERNAME, ['login'])
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;
}
