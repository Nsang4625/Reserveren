import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete, UseGuards} from "@nestjs/common";
import { Brand } from "src/core/businesses/brand/brand.model";
import { CreateBrandDto, UpdateBrandDto } from "src/core/businesses/brand/brand.dto";
import { BrandUseCases } from "src/usecases/brand.usecases";
import { ApiTags } from "@nestjs/swagger";
import {JwtAccessTokenGuard} from "../../infras/guards/jwt-auth.guard";

@Controller("/brands")
@ApiTags('brands')
export class BrandController {
    constructor(private readonly brandUseCases: BrandUseCases){
    }
    @Get()
    @UseGuards(JwtAccessTokenGuard)
    async findAll(): Promise<Brand[]> {
        return this.brandUseCases.getAll();
    }
    @Post()
    async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
        return this.brandUseCases.create(createBrandDto);
    }
    @Patch(':id')
    async update(@Body() updateBrandDto: UpdateBrandDto, @Param('id', ParseIntPipe) id: number): Promise<Brand> {
        return this.brandUseCases.update(id, updateBrandDto);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.brandUseCases.delete(id);
    }
}