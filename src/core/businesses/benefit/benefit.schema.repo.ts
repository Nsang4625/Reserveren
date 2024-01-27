import { Hotel } from "../hotel/hotel.model";
import { Room } from "../room/room.model";
import { Benefit } from "./benefit.model";

export abstract class IBenefitRepository {
    abstract create<T extends Hotel | Room>(benefit: Benefit, owner: T): Promise<Benefit>;
    // abstract update(id: number, benefit: Benefit): Promise<Benefit>;
    abstract delete(id: number): Promise<void>;
    abstract findAllOfHotel(hotelId: number): Promise<Benefit[]>;
    abstract findById(id: number): Promise<any>;
}