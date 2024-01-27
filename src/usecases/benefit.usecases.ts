import { BadRequestException } from "@nestjs/common";
import { CreateBenefitDto } from "src/core/businesses/benefit/benefit.dto";
import { Benefit } from "src/core/businesses/benefit/benefit.model";
import { IBenefitRepository } from "src/core/businesses/benefit/benefit.schema.repo";
import { Hotel } from "src/core/businesses/hotel/hotel.model";
import { IHotelRepository } from "src/core/businesses/hotel/hotel.schema.repo";
import { Room } from "src/core/businesses/room/room.model";
import { IRoomRepository } from "src/core/businesses/room/room.schema.repo";

export class BenefitUseCases {
    constructor(
        private readonly benefitRepository: IBenefitRepository,
        private readonly hotelRepository: IHotelRepository,
        private readonly roomRepository: IRoomRepository
    ){}
    async addHotelBenefit(createBenefitDto: CreateBenefitDto, hotelId: number): Promise<Benefit>{
        const hotel = await this.hotelRepository.getHotelById(hotelId);
        if(!hotel) throw new BadRequestException('Hotel not found');
        const newBenefit = { ...createBenefitDto }
        return this.benefitRepository.create<Hotel>(newBenefit, hotel);
    }
    async getHotelBenefits(hotelId: number): Promise<Benefit[]>{
        return this.benefitRepository.findAllOfHotel(hotelId)
    }
    async deleteHotelBenefit(benefitId: number, hotelId: number): Promise<void>{
        const benefit = await this.benefitRepository.findById(benefitId);
        if(!benefit) throw new BadRequestException('Benefit not found');
        if(benefit.owner.id!== hotelId) throw new BadRequestException('Not owner of this benefit');
        this.benefitRepository.delete(benefitId);
    }
    async addRoomBenefit(createBenefitDto: CreateBenefitDto, roomId: number){
        const room = await this.roomRepository.getOne(roomId);
        if(!room) throw new Error('Room not found');
        const newBenefit = {
           ...createBenefitDto
        }
        return this.benefitRepository.create<Room>(newBenefit, room);
    }
    async getRoomBenefits(roomId: number){
        return this.benefitRepository.findAllOfRoom(roomId);
    }
    async deleteRoomBenefit(){}
}