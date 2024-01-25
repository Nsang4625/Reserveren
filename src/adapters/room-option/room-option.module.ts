import { Module } from "@nestjs/common";
import { RoomOptionRepoModule } from "src/infras/repositories/room-option/room-option.module";
import { RoomOptionController } from "./room-option.controller";
import { RoomOptionUseCases } from "src/usecases/room-option.usecases";
import { RoomRepository } from "src/infras/repositories/room/room.repo";
import { RoomOptionRepository } from '../../infras/repositories/room-option/room-option.repo';
import { RoomRepoModule } from "src/infras/repositories/room/room.repo.module";
import { UserRepoModule } from "src/infras/repositories/user/user.repo.module";

@Module({
    imports: [RoomOptionRepoModule, RoomRepoModule, UserRepoModule],
    controllers: [RoomOptionController],
    providers: [
        {
            provide: RoomOptionUseCases,
            inject: [RoomOptionRepository, RoomRepository],
            useFactory: (roomOptionRepo: RoomOptionRepository,
                 roomRepo: RoomRepository) => new RoomOptionUseCases(roomOptionRepo, roomRepo)
        }
    ],
})
export class RoomOptionModule {}