import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { UserRepoModule } from "../../repositories/user/user.repo.module";
import {JwtRefreshTokenStrategy} from "./strategies/jwt-refresh.strategy";
import { AuthStrategiesService } from './auth-strategies.service';


@Module({
    imports: [PassportModule, JwtModule.register({}), UserRepoModule],
    providers: [AuthService,
         LocalStrategy, JwtAccessTokenStrategy, JwtRefreshTokenStrategy, 
         GoogleStrategy, AuthStrategiesService],
    exports: [AuthService]
})
export class AuthServiceModule {};