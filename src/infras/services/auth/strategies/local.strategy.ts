import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import { AuthStrategiesService } from "../auth-strategies.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authServices: AuthStrategiesService){
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }
    // validate auto fetch these two fields from request body
    async validate(email: string, password: string){
        const user = await this.authServices.getAuthenticatedUser(email, password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}