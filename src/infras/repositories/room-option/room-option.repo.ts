import { InjectRepository } from "@nestjs/typeorm";
import { IRoomOptionRepository } from "src/core/businesses/room-option/room-option.schema.repo";
import { RoomOptionEntity } from "./room-option.entity";
import { Repository } from "typeorm";
import { RoomOption } from "src/core/businesses/room-option/room-option.model";
import { Room } from "src/core/businesses/room/room.model";


export class RoomOptionRepository implements IRoomOptionRepository {
    constructor(
        @InjectRepository(RoomOptionEntity) private readonly roomOptions: Repository<RoomOptionEntity>
    ){}
    async getAllOfOneRoom(id: number): Promise<RoomOption[]> {
        return this.roomOptions.find({
            where: {
                room: {
                    id
                }
            }
        });
    }
    async create(roomOption: RoomOption, room: Room): Promise<RoomOption> {
        return this.roomOptions.save({
            ...roomOption,
            room
        });
    }
    async update(id: number, roomOption: any): Promise<RoomOption> {
        await this.roomOptions.update(id, roomOption);
        return this.roomOptions.findOne({
            where:{
                id
            }
        });
    }
    async delete(id: number): Promise<void> {
        await this.roomOptions.delete(id);
    }
}