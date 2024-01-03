import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete } from "@nestjs/common";
import { Brand } from "src/core/businesses/brand/brand.model";
import { CreateBrandDto, UpdateBrandDto } from "src/core/businesses/brand/brand.dto";
import { BrandUseCases } from "src/usecases/brand.usecases";
import { ApiTags } from "@nestjs/swagger";

@Controller("/api/brands")
@ApiTags('brands')
export class BrandController {
    constructor(private readonly brandUsecases: BrandUseCases){
    }
    @Get()
    async findAll(): Promise<Brand[]> {
        return this.brandUsecases.getAll();
    }
    @Post()
    async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
        return this.brandUsecases.create(createBrandDto);
    }
    @Patch(':id')
    async update(@Body() updateBrandDto: UpdateBrandDto, @Param('id', ParseIntPipe) id: number): Promise<Brand> {
        return this.brandUsecases.update(id, updateBrandDto);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.brandUsecases.delete(id);
    }
}