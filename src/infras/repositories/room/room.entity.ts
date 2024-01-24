import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "../hotel/hotel.entity";


@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    basePrice: number;

    @Column({type: 'int'})
    maxCapacity: number;

    @ManyToOne(() => HotelEntity, (hotel) => hotel.room)
    @JoinColumn({ name: 'hotel_id'})
    hotel: HotelEntity

}