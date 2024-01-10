import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtRefreshTokenGuards extends AuthGuard('refresh_token') {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err ||!user) {
            throw err || new UnauthorizedException('Refresh token expired or invalid');
        }
        return user;
    }
}