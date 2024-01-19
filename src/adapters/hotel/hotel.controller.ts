import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateHotelDto, UpdateHotelDto } from "src/core/businesses/hotel/hotel.dto";
import { OwnerRoleGuard } from "src/infras/guards/owner-role.guard";
import { HotelUseCases } from "src/usecases/hotel.usecases";
import { JwtAccessTokenGuard } from '../../infras/guards/jwt-auth.guard';
import { Hotel } from "src/core/businesses/hotel/hotel.model";

@Controller('/hotels')
export class HotelController {
    constructor(
        private readonly hotelUseCases: HotelUseCases
    ) {}
    @Post('/')
    @UseGuards(JwtAccessTokenGuard, OwnerRoleGuard)
    async createHotel(@Body() createHotelDto: CreateHotelDto): Promise<Hotel>{
        return await this.hotelUseCases.createHotel(createHotelDto);
    }

    @Patch('/:id')
    @UseGuards(JwtAccessTokenGuard, OwnerRoleGuard)
    async updateHotel(@Body() updateHotelDto: UpdateHotelDto, @Param('id') id: number){
        return await this.hotelUseCases.updateHotel(id, updateHotelDto);
    }

    @Delete('/:id')
    @UseGuards(JwtAccessTokenGuard, OwnerRoleGuard)
    async deleteHotel(@Param('id') id: number): Promise<void>{
        return await this.hotelUseCases.deleteHotel(id);
    }
}