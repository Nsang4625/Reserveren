import { Module } from "@nestjs/common";
import { HotelRepoModule } from "src/infras/repositories/hotel/hotel.repo.module";
import { RoomRepoModule } from "src/infras/repositories/room/room.repo.module";
import { BenefitController } from "./benefit.controller";
import { BenefitUseCases } from "src/usecases/benefit.usecases";
import { HotelRepository } from "src/infras/repositories/hotel/hotel.repo";
import { RoomRepository } from "src/infras/repositories/room/room.repo";
import { BenefitRepoModule } from '../../infras/repositories/benefit/benefit.repo.module';
import { BenefitRepository } from '../../infras/repositories/benefit/benefit.repo';

@Module({
    imports: [BenefitRepoModule, HotelRepoModule, RoomRepoModule],
    controllers: [BenefitController],
    providers:[
        {
            provide: BenefitUseCases,
            inject: [BenefitRepository, HotelRepository, RoomRepository],
            useFactory: (benefitRepository: BenefitRepository,
                 hotelRepository: HotelRepository,
                roomRepository: RoomRepository) => new BenefitUseCases(
                    benefitRepository, hotelRepository, roomRepository
                    )
        }
    ]
})
export class BenefitModule{}