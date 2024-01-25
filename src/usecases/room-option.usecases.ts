import { CreateRoomOptionDto, UpdateRoomOptionDto } from "src/core/businesses/room-option/room-option.dto";
import { IRoomOptionRepository } from "src/core/businesses/room-option/room-option.schema.repo";
import { IRoomRepository } from "src/core/businesses/room/room.schema.repo";

export class RoomOptionUseCases {
    constructor(
        private readonly roomOptionRepository: IRoomOptionRepository,
        private readonly roomRepository: IRoomRepository
        ){}
    async createRoomOption(createRoomOptionDto: CreateRoomOptionDto, roomId: number) {
        const room = await this.roomRepository.getOne(roomId);
        return this.roomOptionRepository.create(createRoomOptionDto, room);
    }

    async updateRoomOption(id: number, updateRoomOptionDto: UpdateRoomOptionDto) {
        return this.roomOptionRepository.update(id, updateRoomOptionDto);
    }

    async deleteRoomOption(id: number) {
        return this.roomOptionRepository.delete(id);
    }

    getAllRoomOptions(roomId: number) {
        return this.roomOptionRepository.getAllOfOneRoom(roomId);
    }
}