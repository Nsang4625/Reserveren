import { IAuthService } from "src/core/contracts/auth/auth.services";
import * as bcrypt from 'bcryptjs';
import { UserRepository } from "src/infras/repositories/user/user.repo";
import { Injectable} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements IAuthService{
    constructor(
        private readonly users: UserRepository,
        private readonly jwtService: JwtService
    ){}
    // service for use cases
    async hashedContent(content: string): Promise<string> {
        return bcrypt.hash(content, 11);
    }
    async generateAccessToken(id: string): Promise<string>{
        return this.jwtService.signAsync({id}, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME
        });
    }
    async generateRefreshToken(id: string): Promise<string>{
        const refreshToken = await this.jwtService.signAsync({id},
            {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY ,
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
            });
        await this.users.updateRefreshToken(id,  await this.hashedContent(refreshToken) );
        return refreshToken;
    }
    async generateAccessAndRefreshToken(id: string){
        return {
            accessToken: await this.generateAccessToken(id),
            refreshToken: await this.generateRefreshToken(id)
        }
    }
    async compareHashedContent(content: string, hashedContent: string): Promise<boolean> {
        return bcrypt.compare(content, hashedContent);
    }
}