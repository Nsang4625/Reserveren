import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PolymorphicParent } from "typeorm-polymorphic";
import { HotelEntity } from "../hotel/hotel.entity";
import { RoomEntity } from "../room/room.entity";
import { PolymorphicChildInterface } from "typeorm-polymorphic/dist/polymorphic.interface";

@Entity('benefit')
export class BenefitEntity implements PolymorphicChildInterface{
    @PrimaryGeneratedColumn()
    id: number;
    
    @PolymorphicParent(() => [HotelEntity, RoomEntity])
    owner: HotelEntity | RoomEntity;

    @Column({ type: 'int' })
    entityId: number;

    @Column()
    entityType: string;

    @Column({ type: 'varchar'})
    value: string;
}