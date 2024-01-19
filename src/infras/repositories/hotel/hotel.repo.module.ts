import { TypeOrmModule } from "@nestjs/typeorm";
import { HotelEntity } from "./hotel.entity";
import { Module } from "@nestjs/common";
import { HotelRepository } from "./hotel.repo";


@Module({
    imports: [TypeOrmModule.forFeature([HotelEntity])],
    providers: [HotelRepository],
    exports: [HotelRepository]
})
export class HotelRepoModule {}