import { Module } from '@nestjs/common';
import { AuthServices } from './auth.services';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { UserRepoModule } from "../../repositories/user/user.repo.module";
import {JwtRefreshTokenStrategy} from "./strategies/jwt-refresh.strategy";


@Module({
    imports: [PassportModule, JwtModule.register({}), UserRepoModule],
    providers: [AuthServices, LocalStrategy, JwtAccessTokenStrategy, JwtRefreshTokenStrategy, GoogleStrategy],
    exports: [AuthServices]
})
export class AuthServiceModule {};