import { Module } from "@nestjs/common";
import { HotelController } from "./hotel.controller";
import { HotelUseCases } from "src/usecases/hotel.usecases";
import { AddressService } from "src/infras/services/address/address.service";
import { HotelRepoModule } from "src/infras/repositories/hotel/hotel.repo.module";
import { AddressServiceModule } from "src/infras/services/address/address.service.module";
import { HotelRepository } from '../../infras/repositories/hotel/hotel.repo';
import { UserRepoModule } from "src/infras/repositories/user/user.repo.module";
import { BrandRepoModule } from "src/infras/repositories/brand/brand.repo.module";
import { BrandRepository } from "src/infras/repositories/brand/brand.repo";


@Module({
    imports: [HotelRepoModule, AddressServiceModule, UserRepoModule, BrandRepoModule],
    controllers: [HotelController],
    providers: [
        {
            provide: HotelUseCases,
            inject: [HotelRepository, AddressService, BrandRepository],
            useFactory: (hotelRepository: HotelRepository, 
                addressService: AddressService,
                brandRepository: BrandRepository) => new HotelUseCases(
                    hotelRepository, addressService, brandRepository)
        }
    ],
})
export class HotelModule {}