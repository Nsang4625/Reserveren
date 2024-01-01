import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}

export { Brands as BrandEntity }