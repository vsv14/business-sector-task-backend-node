import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ unique: true })
    public email!: string;

    @Column()
    pass!: string;

    @Column()
    name!: string;

    @Column({nullable:true})
    surname?: string;

    @Column({nullable:true})
    gender?: string;

    @Column({nullable:true})
    photo?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt?: Date;
}