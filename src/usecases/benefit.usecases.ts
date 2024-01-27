import { CreateBenefitDto } from "src/core/businesses/benefit/benefit.dto";
import { IBenefitRepository } from "src/core/businesses/benefit/benefit.schema.repo";
import { Hotel } from "src/core/businesses/hotel/hotel.model";
import { IHotelRepository } from "src/core/businesses/hotel/hotel.schema.repo";
import { IRoomRepository } from "src/core/businesses/room/room.schema.repo";

export class BenefitUseCases {
    constructor(
        private readonly benefitRepository: IBenefitRepository,
        private readonly hotelRepository: IHotelRepository,
        private readonly roomRepository: IRoomRepository
    ){}
    async addHotelBenefit(createBenefitDto: CreateBenefitDto, hotelId: number){
        const hotel = await this.hotelRepository.getHotelById(hotelId);
        if(!hotel) throw new Error('Hotel not found');
        const newBenefit = { ...createBenefitDto }
        return this.benefitRepository.create<Hotel>(newBenefit, hotel);
    }
    async getHotelBenefits(hotelId: number){
        return this.benefitRepository.findAllOfHotel(hotelId)
    }
//    async updateHotelBenefit(){}
    async deleteHotelBenefit(){}
    async addRoomBenefit(){}
    async getRoomBenefits(){}
//    async updateRoomBenefit(){}
    async deleteRoomBenefit(){}
}