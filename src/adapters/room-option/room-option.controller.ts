import { Controller, Get, Post, Delete, Param, ParseIntPipe, Patch, UseGuards, Body } from '@nestjs/common'
import { CreateRoomOptionDto, UpdateRoomOptionDto } from 'src/core/businesses/room-option/room-option.dto';
import { JwtAccessTokenGuard } from 'src/infras/guards/jwt-auth.guard';
import { RoomOwnershipGuard } from 'src/infras/guards/room-ownership.guard';
import { RoomOptionUseCases } from 'src/usecases/room-option.usecases';

@Controller('brands/:brandId/hotels/:hotelId/rooms/:roomId/room-options')
export class RoomOptionController {
    constructor(private readonly roomOptionUseCases: RoomOptionUseCases){}
    @Post('/')
    @UseGuards(JwtAccessTokenGuard, RoomOwnershipGuard)
    async createRoomOption(@Body() createRoomOptionDto: CreateRoomOptionDto, @Param('roomId', ParseIntPipe) roomId: number) {
        return this.roomOptionUseCases.createRoomOption(createRoomOptionDto, roomId);
    }

    @Patch('/:id')
    @UseGuards(JwtAccessTokenGuard, RoomOwnershipGuard)
    async updateRoomOption(@Body() updateRoomOptionDto: UpdateRoomOptionDto, @Param('id', ParseIntPipe) id: number){
        return this.roomOptionUseCases.updateRoomOption(id, updateRoomOptionDto);
    }

    @Delete('/:id')
    @UseGuards(JwtAccessTokenGuard, RoomOwnershipGuard)
    async deleteRoomOption(@Param('id', ParseIntPipe) id: number){
        return this.roomOptionUseCases.deleteRoomOption(id);
    }

    @Get('/')
    getAllRoomOptions(@Param('roomId', ParseIntPipe) roomId: number){
        return this.roomOptionUseCases.getAllRoomOptions(roomId);
    }
}
