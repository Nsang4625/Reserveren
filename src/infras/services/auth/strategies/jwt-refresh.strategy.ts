import { Request } from 'express';
import {Injectable, UseFilters} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from "process";
import { AuthStrategiesService } from '../auth-strategies.services';


@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'refresh_token',
) {
    constructor(private readonly authService: AuthStrategiesService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {
        return await this.authService.getUserIfRefreshTokenMatched(
            payload.id,
            request.headers.authorization.split('Bearer ')[1],
        );
    }
}