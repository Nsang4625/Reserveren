import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BrandEntity } from "../brand/brand.entity";

@Entity('hotel')
export class HotelEntity {
    @PrimaryGeneratedColumn({ type: 'int'})
    id: number;

    @Column({ type: 'varchar'})
    address: string;

    @Column({ name: 'min_price', type: 'int'})
    minPrice: number;

    @Column({ type: 'varchar'})
    category: string;

    @Column({ type: 'float'})
    longitude: number;

    @Column({ type: 'float'})
    latitude: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ name: 'brand_id', type: 'int'})
    brandId: number;
    
    @ManyToOne(() => BrandEntity, brand => brand.hotel)
    @JoinColumn({ name: 'brand_id'})
    brand: BrandEntity;
    // @Column()
    // thumbnail: string;
}