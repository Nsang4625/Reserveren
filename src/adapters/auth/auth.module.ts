import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthUseCases } from 'src/usecases/auth.usecases';
import { UserRepository } from 'src/infras/repositories/user/user.repo';
import { AuthServiceModule } from '../../infras/services/auth/auth.service.module';
import { AuthService } from 'src/infras/services/auth/auth.service';
import {UserRepoModule} from "../../infras/repositories/user/user.repo.module";

@Module({
    imports: [AuthServiceModule, UserRepoModule],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthUseCases,
            inject:[UserRepository, AuthService],
            useFactory: (userRepo: UserRepository, authService: AuthService) => new AuthUseCases(userRepo, authService)
        }
    ],
})
export class AuthModule {};