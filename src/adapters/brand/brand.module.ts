import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandUseCases } from 'src/usecases/brand.usecases';
import { BrandRepoModule } from 'src/infras/repositories/brand/brand.repo.module';
import { BrandRepository } from 'src/infras/repositories/brand/brand.repo';

@Module({
    imports: [BrandRepoModule],
    controllers: [BrandController],
    providers: [
        {
            provide: BrandUseCases,
            inject:[BrandRepository],
            useFactory: (brandRepo: BrandRepository) => new BrandUseCases(brandRepo)
        }
    ],
})
export class BrandModule {}
