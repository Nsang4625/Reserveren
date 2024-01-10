import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthUseCases } from 'src/usecases/auth.usecases';
import { UserRepository } from 'src/infras/repositories/user/user.repo';
import { AuthServiceModule } from '../../infras/services/auth/auth.services.module';
import { AuthServices } from 'src/infras/services/auth/auth.services';
import {UserRepoModule} from "../../infras/repositories/user/user.repo.module";

@Module({
    imports: [AuthServiceModule, UserRepoModule],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthUseCases,
            inject:[UserRepository, AuthServices],
            useFactory: (userRepo: UserRepository, authService: AuthServices) => new AuthUseCases(userRepo, authService)
        }
    ],
})
export class AuthModule {};