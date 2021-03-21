import { Company } from "src/company/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    isPrincipal: boolean;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    personalPhone: string;

    @Column()
    workPhone: string;

    @Column()
    street: string;
    
    @Column()
    city: string;

    @Column()
    postalCode: string;

    @Column()
    function: string;

    // Foreign key
    @Column()
    companyId: number;

    // Relation
    @ManyToOne(() => Company, (company) => company.contacts)
    company: Company;
}
