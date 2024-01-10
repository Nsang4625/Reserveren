import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/infras/repositories/user/user.repo";
import * as bcrypt from 'bcryptjs';
import { User } from "src/core/businesses/user/user.model";

@Injectable()
export class AuthStrategiesService {
    constructor(
        private readonly users: UserRepository,
    ){}
    // services for strategies
    async getAuthenticatedUser(email: string, password: string): Promise<User> {
        const user = await this.users.findByEmail(email);
        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Wrong password')
        }
        return user;
    }
    async getUserIfRefreshTokenMatched(id: string, refreshToken: string): Promise<User> {
        const existedUser = await this.users.findById(id);
        if(!await bcrypt.compare(refreshToken, existedUser.refreshToken)){
            throw new BadRequestException('Refresh Token invalid!')
        }
        return existedUser;
    }
    async getUserById(id: string){
        return await this.users.findById(id);
    }
}