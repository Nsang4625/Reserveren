import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandUseCases } from 'src/usecases/brand.usecases';
import { BrandRepoModule } from 'src/infras/repositories/brand/brand.repo.module';
import { BrandRepository } from 'src/infras/repositories/brand/brand.repo';
import { UserRepoModule } from 'src/infras/repositories/user/user.repo.module';
import { UserRepository } from '../../infras/repositories/user/user.repo';

@Module({
    imports: [BrandRepoModule, UserRepoModule],
    controllers: [BrandController],
    providers: [
        {
            provide: BrandUseCases,
            inject:[BrandRepository, UserRepository],
            useFactory: (brandRepo: BrandRepository, userRepo: UserRepository) => new BrandUseCases(brandRepo, userRepo)
        }
    ],
})
export class BrandModule {}