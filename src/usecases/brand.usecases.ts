import { Brand } from 'src/core/businesses/brand/brand.model';
import { IBrandRepository } from 'src/core/businesses/brand/brand.scheme.repo';
import { CreateBrandDto, UpdateBrandDto } from '../core/businesses/brand/brand.dto';
import { BrandEntity } from 'src/infras/repositories/brand/brand.entity';
import { User } from 'src/core/businesses/user/user.model';
import { IUserRepository } from 'src/core/businesses/user/user.schema.repo';
import { BadRequestException } from '@nestjs/common';
import { Hotel } from 'src/core/businesses/hotel/hotel.model';

export class BrandUseCases {
    constructor(
        private brandRepository: IBrandRepository,
        private userRepository: IUserRepository
        ) {}
    async getAll(): Promise<Brand[]> {
        return await this.brandRepository.getAll();
    }
    async getOne(id: number): Promise<Brand> {
        return await this.brandRepository.getOne(id);
    }
    async create(createBrandDto: CreateBrandDto, user: User): Promise<Brand> {
        const newBrand: BrandEntity = new BrandEntity();
        newBrand.name = createBrandDto.name;
        newBrand.website = createBrandDto.website;
        newBrand.description = createBrandDto.description;
        newBrand.email = createBrandDto.email;
        return await this.brandRepository.create(newBrand, user);
    }
    async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
        return await this.brandRepository.update(id, updateBrandDto);
    }
    async delete(id: number): Promise<void> {
        return await this.brandRepository.delete(id);
    }
    async addStaff(userEmail: string, brandId: number): Promise<void>{
        const user = await this.userRepository.findByEmail(userEmail);
        if(!user){
            throw new BadRequestException('User not found');
        }
        const brand = await this.brandRepository.getOne(brandId);
        if(!brand){
            throw new BadRequestException('Brand not found');
        }
        await this.brandRepository.addStaff(user, brand);
    }
    async removeStaff(userEmail: string, brandId: number): Promise<void>{
        const user = await this.userRepository.findByEmail(userEmail);
        if(!user){
            throw new BadRequestException('User not found');
        }
        const brand = await this.brandRepository.getOne(brandId);
        if(!brand){
            throw new BadRequestException('Brand not found');
        }
        await this.brandRepository.removeStaff(user, brand);
    }
    async getHotelsOfThisBrand(brandId: number): Promise<Hotel[]> {
        return await this.brandRepository.getHotelsOfThisBrand(brandId);
    }
}