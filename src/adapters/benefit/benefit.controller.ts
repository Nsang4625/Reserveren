import { Body, Controller, Get, Patch, Post, UseGuards, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateBenefitDto } from "src/core/businesses/benefit/benefit.dto";
import { HotelOwnershipGuard } from "src/infras/guards/hotel-ownership.guard";
import { JwtAccessTokenGuard } from "src/infras/guards/jwt-auth.guard";
import { RoomOwnershipGuard } from "src/infras/guards/room-ownership.guard";
import { BenefitUseCases } from "src/usecases/benefit.usecases";

@Controller('brands/:brandId/hotels/:hotelId')
export class BenefitController {
    constructor(private readonly benefitUseCases: BenefitUseCases){}
    @Post('/benefits')
    @UseGuards(JwtAccessTokenGuard, HotelOwnershipGuard)
    async addHotelBenefit(@Body() createBenefitDto: CreateBenefitDto, @Param('hotelId') hotelId: number){
        return this.benefitUseCases.addHotelBenefit(createBenefitDto, hotelId);
    }
    @Get('/benefits')
    async getHotelBenefits(@Param('hotelId', ParseIntPipe) hotelId: number){
        return this.benefitUseCases.getHotelBenefits(hotelId);
    }
    @Patch('/benefits/:benefitId')
    @UseGuards(JwtAccessTokenGuard, HotelOwnershipGuard)
    async updateHotelBenefit(){

    }
    @Delete('/benefits/:benefitId')
    @UseGuards(JwtAccessTokenGuard, HotelOwnershipGuard)
    async deleteHotelBenefit(){

    }

    @Post('/rooms/:roomId/benefits')
    @UseGuards(JwtAccessTokenGuard, RoomOwnershipGuard)
    async addRoomBenefit(@Body() createBenefitDto: CreateBenefitDto){

    }
    @Get('/rooms/:roomId/benefits')
    async getRoomBenefits(){

    }
    @Patch('/rooms/:roomId/benefits/:benefitId')
    @UseGuards(JwtAccessTokenGuard, RoomOwnershipGuard)
    async updateRoomBenefit(){

    }
    @Delete('/rooms/:roomId/benefits/:benefitId')
    @UseGuards(JwtAccessTokenGuard, RoomOwnershipGuard)
    async deleteRoomBenefit(){

    }
}