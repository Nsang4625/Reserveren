import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BenefitEntity } from "./benefit.entity";
import { BenefitPolymorphic, BenefitRepository } from "./benefit.repo";

@Module({
    imports: [TypeOrmModule.forFeature([BenefitEntity, BenefitPolymorphic])],
    providers: [BenefitRepository],
    exports: [BenefitRepository]
})
export class BenefitRepoModule {}