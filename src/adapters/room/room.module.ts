import { Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { RoomUseCases } from "src/usecases/room.usecases";
import { RoomRepository } from "src/infras/repositories/room/room.repo";
import { RoomRepoModule } from "src/infras/repositories/room/room.repo.module";
import { UserRepoModule } from "src/infras/repositories/user/user.repo.module";
import { HotelRepoModule } from "src/infras/repositories/hotel/hotel.repo.module";
import { HotelRepository } from "src/infras/repositories/hotel/hotel.repo";


@Module({
    imports: [RoomRepoModule, UserRepoModule, HotelRepoModule],
    controllers: [RoomController],
    providers: [{
        provide: RoomUseCases,
        inject: [RoomRepository, HotelRepository],
        useFactory: (roomRepo: RoomRepository,
            hotelRepo: HotelRepository) => new RoomUseCases(roomRepo, hotelRepo)
    }],
})
export class RoomModule {}