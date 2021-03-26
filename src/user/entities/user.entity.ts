import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export const UNIQUE_USERNAME = 'UNIQUE_USERNAME'

@Entity()
@Unique(UNIQUE_USERNAME, ['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;
}
