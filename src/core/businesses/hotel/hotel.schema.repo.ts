import { Brand } from "../brand/brand.model";
import { Hotel } from "./hotel.model";

export abstract class IHotelRepository {
    abstract getHotels(): Promise<Hotel[]>;
    abstract getHotelById(id: number): Promise<Hotel>;
    abstract createHotel(hotel: Hotel, brand: Brand): Promise<Hotel>;
    abstract updateHotel(id: number, hotel: any): Promise<Hotel>;
    abstract deleteHotel(id: number): Promise<void>;
}