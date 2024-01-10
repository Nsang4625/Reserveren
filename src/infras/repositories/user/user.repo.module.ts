import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repo';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserRepoModule {};