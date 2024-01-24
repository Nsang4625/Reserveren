import { InjectRepository } from "@nestjs/typeorm";
import { IRoomRepository } from "src/core/businesses/room/room.schema.repo";
import { RoomEntity } from "./room.entity";
import { Repository } from "typeorm";
import { Room } from "src/core/businesses/room/room.model";
import { UpdateRoomDto } from "src/core/businesses/room/room.dto";
import { Hotel } from "src/core/businesses/hotel/hotel.model";


export class RoomRepository implements IRoomRepository {
    constructor(
        @InjectRepository(RoomEntity) private readonly rooms: Repository<RoomEntity>
    ){}
    async getAll(): Promise<Room[]> {
        return this.rooms.find();
    }
    async getOne(id: number): Promise<Room> {
        return this.rooms.findOne({
            where: {
                id
            }
        })
    }
    async getRoomsOfOneHotel(hotelId: number): Promise<Room[]> {
        return this.rooms.find({
            where: {
                hotel: {
                    id: hotelId
                }
            }
        })
    }
    async getRoomWithHotelAndBrand(id: number){
        return this.rooms.createQueryBuilder("room")
            .leftJoinAndSelect("room.hotel", "hotel")
            .leftJoinAndSelect("hotel.brand", "brand")
            .where("room.id = :id", { id })
            .getOne();
    }
    async create(room: Room, hotel: Hotel): Promise<Room> {
        return this.rooms.save({
            ...room,
            hotel
        });
    }
    async update(id: number, room: UpdateRoomDto): Promise<Room> {
        await this.rooms.createQueryBuilder()
            .update(RoomEntity)
            .set({...room})
            .where("id = :id", { id })
            .execute()
        return this.rooms.findOne({
            where: {
                id
            }
        })
    }
    async delete(id: number): Promise<void> {
        await this.rooms.delete(id);
    }
}