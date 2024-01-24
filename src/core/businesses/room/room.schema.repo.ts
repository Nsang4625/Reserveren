import { Hotel } from "../hotel/hotel.model";
import { Room } from "./room.model";

export abstract class IRoomRepository {
  abstract getAll(): Promise<Room[]>;
  abstract getOne(id: number): Promise<Room>;
  abstract getRoomsOfOneHotel(hotelId: number): Promise<Room[]>;
  abstract create(room: Room, hotel: Hotel): Promise<Room>;
  abstract update(id: number, room: any): Promise<Room>;
  abstract delete(id: number): Promise<void>;
}