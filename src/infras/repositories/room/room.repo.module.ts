import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomEntity } from "./room.entity";
import { RoomRepository } from "./room.repo";


@Module({
    imports: [TypeOrmModule.forFeature([RoomEntity])],
    providers: [RoomRepository],
    exports: [RoomRepository]
})
export class RoomRepoModule {}