import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from "@nestjs/passport";

import {Injectable} from "@nestjs/common";
import { AuthStrategiesService } from '../auth-strategies.services';
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private readonly authService: AuthStrategiesService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY
            }
        );
    }
    async validate(payload: any) {
        const { id } = payload;
        const user = await this.authService.getUserById(id);
        return user;
    }
}