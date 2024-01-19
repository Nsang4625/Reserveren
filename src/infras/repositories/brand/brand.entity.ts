import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { BrandUser } from './brands-user.entity';
import { HotelEntity } from '../hotel/hotel.entity';

@Entity({ name: 'brand'})
class Brands {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  website: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(() => BrandUser, brandUser => brandUser.brand)
  brandUser?: BrandUser[]

  @OneToMany(() => HotelEntity, hotel => hotel.brand)
  hotel: HotelEntity[]
}

export { Brands as BrandEntity }