import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBrandRepo } from 'src/core/businesses/brand/brand.scheme.repo';
import { BrandEntity } from './brand.entity';
import { Repository } from 'typeorm';
import { Brand } from 'src/core/businesses/brand/brand.model';

@Injectable()
export class BrandRepository implements IBrandRepo {
    constructor(@InjectRepository(BrandEntity) private readonly brands: Repository<BrandEntity>) {}
    async getAll(): Promise<Brand[]> {
        return await this.brands.find();
    }
    async getOne(id: number): Promise<Brand> {
        return await this.brands.findOne({
            where: {
                id: id
            }
        });
    }
    async create(brand: Brand): Promise<Brand> {
        return await this.brands.save(brand);
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
}