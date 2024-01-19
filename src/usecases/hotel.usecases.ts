import { BadRequestException } from "@nestjs/common";
import { IBrandRepository } from "src/core/businesses/brand/brand.scheme.repo";
import { CreateHotelDto } from "src/core/businesses/hotel/hotel.dto";
import { IHotelRepository } from "src/core/businesses/hotel/hotel.schema.repo";
import { IAddressService } from "src/core/contracts/address/address.service";

export class HotelUseCases {
    constructor(
        private readonly hotelRepository: IHotelRepository,
        private readonly addressService: IAddressService,
        private readonly brandRepository: IBrandRepository
    ) {}
    async createHotel(createHotelDto: CreateHotelDto){
        const address = await this.addressService.translaterCoordinatesToAddress(createHotelDto.latitude, createHotelDto.longitude);
        const brand = await this.brandRepository.getOne(createHotelDto.brandId);
        if(!brand) throw new BadRequestException('Brand not found');
        const hotel = await this.hotelRepository.createHotel({
            ...createHotelDto,
            address
        }, brand);
        return hotel;
    }
}