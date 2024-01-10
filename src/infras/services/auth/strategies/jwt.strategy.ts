import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from "@nestjs/passport";
import { AuthServices} from "../auth.services";
import {Injectable} from "@nestjs/common";
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private readonly authService: AuthServices) {
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