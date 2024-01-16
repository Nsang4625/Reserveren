import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBrandRepository } from 'src/core/businesses/brand/brand.scheme.repo';
import { BrandEntity } from './brand.entity';
import { Repository } from 'typeorm';
import { Brand } from 'src/core/businesses/brand/brand.model';
import { User } from 'src/core/businesses/user/user.model';

@Injectable()
export class BrandRepository implements IBrandRepository {
    constructor(@InjectRepository(BrandEntity) private readonly brands: Repository<BrandEntity>) {}
    async getAll(): Promise<Brand[]> {
        const brandEntities = await this.brands.find();
        return brandEntities.map(brandE => this.toBrand(brandE));
    }
    async getOne(id: number): Promise<Brand> {
        const brandEntity = await this.brands.findOne({
            where: {
                id: id
            }
        });
        return this.toBrand(brandEntity);
    }
    async create(brand: Brand, user: User): Promise<Brand> {
        const brandE = this.toBrandEntity(brand);
        const result = await this.brands.save(brandE);
        await this.brands.createQueryBuilder()
        .insert()
        .into('brand_user')
        .values([{ user, role: 'owner', brand: result }])
        .execute();
        return this.toBrand(result);
    }
    async addStaff(user: User, brand: Brand): Promise<void> {
        await this.brands.createQueryBuilder()
        .insert()
        .into('brand_user')
        .values([{ user, role: 'staff', brand }])
        .execute();
    }
    async update(id: number, brand: any): Promise<Brand> {
        await this.brands.update(id, {
            ...brand
        });
        return await this.brands.findOne({
            where: {
                id: id
            }
        });
    }
    async delete(id: number): Promise<void> {
        await this.brands.delete(id);
    }
    private toBrand(brandE: BrandEntity): Brand {
        return {
            id: brandE.id,
            name: brandE.name,
            description: brandE.description,
            website: brandE.website,
            email: brandE.email
        }
    }
    private toBrandEntity(brand: Brand): BrandEntity {
        return {
            id: brand.id,
            name: brand.name,
            description: brand.description,
            website: brand.website,
            email: brand.email
        }
    }
}