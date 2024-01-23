import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RoomRepository } from "../repositories/room/room.repo";
import { Observable } from "rxjs";


@Injectable()
export class RoomOwnershipGuard implements CanActivate {
    constructor(private readonly roomRepository: RoomRepository){

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const brandId = request.params.brandId;
        const hotelId = request.params.hotelId;
        const roomId = request.params.roomId || request.params.id;
        const room = await this.roomRepository.getRoomWithHotelAndBrand(roomId);
        if(room.hotel.id === Number(hotelId) && room.hotel.brand.id === Number(brandId)){
            return true;
        }
        return false;

    }
}