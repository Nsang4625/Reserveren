import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "../hotel/hotel.entity";
import { RoomOptionEntity } from "../room-option/room-option.entity";


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

    @OneToMany(() => RoomOptionEntity, (roomOption) => roomOption.room)
    roomOption: RoomOptionEntity[]
}