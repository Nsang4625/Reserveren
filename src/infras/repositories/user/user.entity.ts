import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true})
    password: string;

    @Column({ nullable: true})
    refreshToken: string;
}

export { Users as UserEntity };
