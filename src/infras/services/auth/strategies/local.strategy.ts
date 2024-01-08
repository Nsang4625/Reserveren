import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthServices } from "../auth.services";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authServices: AuthServices){
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }
    // validate auto fetch these two fields from request body
    async validate(email: string, password: string, done: any){
        const user = await this.authServices.getAuthenticatedUser(email, password);
        if(!user){
            throw new UnauthorizedException();
        }
        done(null, user);
        //return user;
    }
}