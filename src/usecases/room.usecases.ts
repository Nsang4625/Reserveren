import { IRoomRepository } from 'src/core/businesses/room/room.schema.repo';
import { CreateRoomDto, UpdateRoomDto } from '../core/businesses/room/room.dto';
import { IHotelRepository } from 'src/core/businesses/hotel/hotel.schema.repo';
import { Room } from 'src/core/businesses/room/room.model';

export class RoomUseCases {
    constructor(
        private readonly roomRepository: IRoomRepository,
        private readonly hotelRepository: IHotelRepository,
        ){
    }
    async createRoom(createRoomDto: CreateRoomDto, hotelId: number){
        const hotel = await this.hotelRepository.getHotelById(hotelId);
        const room = new Room();
        room.basePrice = createRoomDto.basePrice;
        room.maxCapacity = createRoomDto.maxCapacity;
        return this.roomRepository.create(room, hotel);
    }
    async updateRoom(id: number, updateRoomDto: UpdateRoomDto){
        return this.roomRepository.update(id, updateRoomDto);
    }
    async getRoom(id: number){
        return this.roomRepository.getOne(id);
    }
    async deleteRoom(id: number){
        return this.roomRepository.delete(id);
    }
    async getRoomsOfOneHotel(hotelId: number){
        return this.roomRepository.getRoomsOfOneHotel(hotelId);
    }
}