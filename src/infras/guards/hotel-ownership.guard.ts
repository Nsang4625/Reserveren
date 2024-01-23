import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HotelRepository } from '../repositories/hotel/hotel.repo';

@Injectable()
export class HotelOwnershipGuard implements CanActivate{
    constructor(private readonly hotelRepository: HotelRepository){
    }

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const brandId = request.params.brandId;
        const hotelId = request.params.hotelId;
        const hotel = await this.hotelRepository.getHotelWithBrand(hotelId);
        if(hotel.brand.id === Number(brandId)){
            return true;
        }
        return false;
        
    }
}