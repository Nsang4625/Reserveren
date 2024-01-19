import { InjectRepository } from "@nestjs/typeorm";
import { IHotelRepository } from "src/core/businesses/hotel/hotel.schema.repo";
import { HotelEntity } from "./hotel.entity";
import { Repository } from "typeorm";
import { Hotel } from "src/core/businesses/hotel/hotel.model";
import { Brand } from "src/core/businesses/brand/brand.model";
import { BadRequestException } from "@nestjs/common";
import { UpdateHotelDto } from "src/core/businesses/hotel/hotel.dto";

export class HotelRepository implements IHotelRepository{
    constructor(
        @InjectRepository(HotelEntity) private readonly hotels: Repository<HotelEntity>
    ) {}
    async getHotels(): Promise<Hotel[]> {
        return await this.hotels.find();
    }
    async getHotelById(id: number): Promise<Hotel> {
        return await this.hotels.findOne({
            where: { id }
        });
    }
    async createHotel(hotel: Hotel, brand: Brand): Promise<Hotel> {
        return await this.hotels.save({
            ...hotel,
            brand
        });
    }
    async updateHotel(id: number, hotel: UpdateHotelDto): Promise<Hotel> {
        const result = await this.hotels.createQueryBuilder()
            .update(HotelEntity)
            .set(hotel)
            .where("id = :id AND brand_id = :brandId", { id, brandId: hotel.brandId })
            .execute();
        if(result.affected === 0) {
            throw new BadRequestException('Hotel not found or not belong to your brand!')
        }
        return await this.hotels.findOne({
            where: { id }
        });
    }
    async deleteHotel(id: number): Promise<void> {
        const hotel = await this.hotels.findOne({
            where: { id }
        });
        await this.hotels.delete(id);
        return ;
    }

}