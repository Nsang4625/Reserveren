import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomOptionEntity } from "./room-option.entity";
import { RoomOptionRepository } from "./room-option.repo";

@Module({
    imports: [TypeOrmModule.forFeature([RoomOptionEntity])],
    providers: [RoomOptionRepository],
    exports: [RoomOptionRepository]
})
export class RoomOptionRepoModule {}