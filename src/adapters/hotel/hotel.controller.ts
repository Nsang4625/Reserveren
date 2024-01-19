import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateHotelDto } from "src/core/businesses/hotel/hotel.dto";
import { OwnerRoleGuard } from "src/infras/guards/owner-role.guard";
import { HotelUseCases } from "src/usecases/hotel.usecases";
import { JwtAccessTokenGuard } from '../../infras/guards/jwt-auth.guard';

@Controller('/hotels')
export class HotelController {
    constructor(
        private readonly hotelUseCases: HotelUseCases
    ) {}

    @Post('/create')
    @UseGuards(JwtAccessTokenGuard, OwnerRoleGuard)
    async createHotel(@Body() createHotelDto: CreateHotelDto){
        return await this.hotelUseCases.createHotel(createHotelDto);
    }
}