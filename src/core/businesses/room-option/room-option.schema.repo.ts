import { Room } from "../room/room.model";
import { RoomOption } from "./room-option.model";

export abstract class IRoomOptionRepository {
  abstract getAllOfOneRoom(id: number): Promise<RoomOption[]>;
  abstract create(roomOption: RoomOption, room: Room): Promise<RoomOption>;
  abstract update(id: number, roomOption: any): Promise<RoomOption>;
  abstract delete(id: number): Promise<void>;
}
