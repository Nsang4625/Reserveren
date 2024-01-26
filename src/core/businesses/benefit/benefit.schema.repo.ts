import { Hotel } from "../hotel/hotel.model";
import { Room } from "../room/room.model";
import { Benefit } from "./benefit.model";

export abstract class IBenefitRepository {
    abstract create(benefit: Benefit, owner: Hotel | Room): Promise<Benefit>;
    // abstract update(id: number, benefit: Benefit): Promise<Benefit>;
    // abstract delete(id: number): Promise<void>;
    // abstract findAll(): Promise<Benefit[]>;
    // abstract findById(id: number): Promise<Benefit>;
}