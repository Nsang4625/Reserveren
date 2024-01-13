import { Module } from '@nestjs/common';
import { BrandRepository } from './brand.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { BrandUser } from './brands-user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity, BrandUser])],
    providers: [BrandRepository],
    exports: [BrandRepository]
})
export class BrandRepoModule {}
