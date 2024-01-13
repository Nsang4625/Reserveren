import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BrandEntity } from './brand.entity';

@Entity({ name: 'brand_user'})
export class BrandUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: [ 'owner', 'staff'], default: 'staff'})
    role: string;

    @ManyToOne(() => UserEntity, user => user.brandUser )
    @JoinColumn({ name: 'user_id'})
    user: UserEntity;

    @ManyToOne(() => BrandEntity, brand => brand.brandUser)
    @JoinColumn({ name: 'brand_id'})
    brand: BrandEntity;
} 