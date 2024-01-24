import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateRoomDto, UpdateRoomDto } from "src/core/businesses/room/room.dto";
import { HotelOwnershipGuard } from "src/infras/guards/hotel-ownership.guard";
import { JwtAccessTokenGuard } from "src/infras/guards/jwt-auth.guard";
import { RoomOwnershipGuard } from "src/infras/guards/room-ownership.guard";
import { StaffRoleGuard } from "src/infras/guards/staff-role.guard";
import { RoomUseCases } from "src/usecases/room.usecases";


@Controller('brands/:brandId/hotels/:hotelId/rooms')
export class RoomController {
    constructor(private readonly roomUseCases: RoomUseCases){
    }

    @Get()
    async getRoomOfOneHotel(@Param('hotelId', ParseIntPipe) hotelId: number){
        return this.roomUseCases.getRoomsOfOneHotel(hotelId);
    }

    @Post()
    @UseGuards(JwtAccessTokenGuard, StaffRoleGuard, HotelOwnershipGuard)
    async createRoom(@Body() createRoomDto: CreateRoomDto, @Param('hotelId', ParseIntPipe) hotelId: number){
        return this.roomUseCases.createRoom(createRoomDto, hotelId);
    }

    @Patch('/:id')
    @UseGuards(JwtAccessTokenGuard, StaffRoleGuard, RoomOwnershipGuard)
    async updateRoom(@Body() updateRoomDto: UpdateRoomDto, @Param('id', ParseIntPipe) id: number){
        return this.roomUseCases.updateRoom(id, updateRoomDto);
    }

    @Get('/:id')
    async getRoom(@Param('id', ParseIntPipe) id: number){
        return this.roomUseCases.getRoom(id);
    }

    @Delete('/:id')
    @UseGuards(JwtAccessTokenGuard, StaffRoleGuard, RoomOwnershipGuard)
    async deleteRoom(@Param('id', ParseIntPipe) id: number){
        return this.roomUseCases.deleteRoom(id);
    }
}