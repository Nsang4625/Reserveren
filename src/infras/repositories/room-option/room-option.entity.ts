import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { RoomEntity } from '../room/room.entity';

@Entity('room_option')
export class RoomOptionEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    option: string;

    @Column()
    price: number;

    @ManyToOne(() => RoomEntity, room => room.roomOption, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;
}
