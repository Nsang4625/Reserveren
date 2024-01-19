import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete, UseGuards, Req} from "@nestjs/common";
import { Brand } from "src/core/businesses/brand/brand.model";
import { AddStaffDto, CreateBrandDto, RemoveStaffDto, UpdateBrandDto } from "src/core/businesses/brand/brand.dto";
import { BrandUseCases } from "src/usecases/brand.usecases";
import { ApiTags } from "@nestjs/swagger";
import {JwtAccessTokenGuard} from "../../infras/guards/jwt-auth.guard";
import { OwnerRoleGuard } from "src/infras/guards/owner-role.guard";
import { Hotel } from "src/core/businesses/hotel/hotel.model";

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
    @Post('/create')
    @UseGuards(JwtAccessTokenGuard)
    async create(@Body() createBrandDto: CreateBrandDto, @Req() request): Promise<Brand> {
        const user = request.user;
        return this.brandUseCases.create(createBrandDto, user);
    }
    @Patch(':id')
    async update(@Body() updateBrandDto: UpdateBrandDto, @Param('id', ParseIntPipe) id: number): Promise<Brand> {
        return this.brandUseCases.update(id, updateBrandDto);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.brandUseCases.delete(id);
    }

    @Post('/:id/add-staff/')
    @UseGuards(JwtAccessTokenGuard, OwnerRoleGuard)
    async addStaff(@Param('id', ParseIntPipe) id: number, @Body() addStaffDto: AddStaffDto): Promise<void> {
        return this.brandUseCases.addStaff(addStaffDto.email, id);
    }

    @Delete('/:id/remove-staff/')
    @UseGuards(JwtAccessTokenGuard, OwnerRoleGuard)
    async removeStaff(@Param('id', ParseIntPipe) id: number, @Body() removeStaffDto: RemoveStaffDto): Promise<void> {
        return this.brandUseCases.removeStaff(removeStaffDto.email, id);
    }
    @Get('/:id/hotels')
    async getHotels(@Param('id', ParseIntPipe) id: number): Promise<Hotel[]> {
        return this.brandUseCases.getHotelsOfThisBrand(id);
    }
}