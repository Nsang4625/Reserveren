import { Brand } from 'src/core/businesses/brand/brand.model';
import { IBrandRepo } from 'src/core/businesses/brand/brand.scheme.repo';
import { CreateBrandDto, UpdateBrandDto } from '../core/businesses/brand/brand.dto';

export class BrandUseCases {
    constructor(private brandRepository: IBrandRepo) {}
    async getAll(): Promise<Brand[]> {
        return await this.brandRepository.getAll();
    }
    async getOne(id: number): Promise<Brand> {
        return await this.brandRepository.getOne(id);
    }
    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        const newBrand: Brand = new Brand();
        newBrand.name = createBrandDto.name;
        newBrand.website = createBrandDto.website;
        newBrand.description = createBrandDto.description;
        newBrand.email = createBrandDto.email;
        return await this.brandRepository.create(newBrand);
    }
    async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
        return await this.brandRepository.update(id, updateBrandDto);
    }
    async delete(id: number): Promise<void> {
        return await this.brandRepository.delete(id);
    }
}