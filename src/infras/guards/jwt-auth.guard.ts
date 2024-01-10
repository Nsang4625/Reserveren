import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import  { AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(!user){
            throw new UnauthorizedException('Token expired or invalid');
        }
        return user;
    }
}