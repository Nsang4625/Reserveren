import { Module } from '@nestjs/common';
import { BrandRepository } from './brand.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';


@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity])],
    providers: [BrandRepository],
    exports: [BrandRepository]
})
export class BrandRepoModule {}
