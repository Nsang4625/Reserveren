import { IBenefitRepository } from "src/core/businesses/benefit/benefit.schema.repo";
import { BenefitEntity } from "./benefit.entity";
import { Benefit } from "src/core/businesses/benefit/benefit.model";
import { Room } from "src/core/businesses/room/room.model";
import { Hotel } from "src/core/businesses/hotel/hotel.model";
import { DataSource, Repository } from "typeorm";
import { AbstractPolymorphicRepository, PolymorphicRepository } from "typeorm-polymorphic";
import { Injectable } from "@nestjs/common";

@PolymorphicRepository(BenefitEntity)
export class BenefitPolymorphic extends AbstractPolymorphicRepository<BenefitEntity>{
}

@Injectable()
export class BenefitRepository implements IBenefitRepository {
    private readonly benefits: Repository<BenefitEntity>;
    constructor(
        private dataSource: DataSource,
    ){
        this.benefits = AbstractPolymorphicRepository.createRepository(this.dataSource, BenefitPolymorphic);
    }
    async create<T extends Hotel | Room>(benefit: Benefit, owner: T): Promise<Benefit> {
        return await this.benefits.save({
            ...benefit,
            owner
        });
    }

    async findAllOfHotel(id: number): Promise<Benefit[]> {
        return await this.benefits.createQueryBuilder('benefit')
            .select(['id', 'value'])
            .where('benefit.entityId = :id AND benefit.entityType = :entityType', { id, entityType: 'HotelEntity' })
            .getRawMany();
    }
    async findAllOfRoom(id: number): Promise<Benefit[]> {
        return await this.benefits.createQueryBuilder('benefit')
            .select(['id', 'value'])
            .where('benefit.entityId = :id AND benefit.entityType = :entityType', { id, entityType: 'RoomEntity' })
            .getRawMany();
    }

    async delete(id: number): Promise<void> {
        await this.benefits.delete(id);
        return;
    }
    async findById(id: number): Promise<any> {
        return await this.benefits.findOne({
            where: {
                id
            }
        });
    }
}