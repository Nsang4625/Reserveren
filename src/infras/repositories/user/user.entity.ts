import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { BrandUser } from '../brand/brands-user.entity';

@Entity({ name: 'user'})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true})
    password: string;

    @Column({ nullable: true, name: 'refresh_token'})
    refreshToken: string;

    @OneToMany(() => BrandUser, brandUser => brandUser.user)
    brandUser: BrandUser[];
}

export { Users as UserEntity };
