import { ConflictException } from "@nestjs/common";
import { IUserRepository } from "src/core/businesses/user/user.schema.repo";
import { SignUpLocalDto } from "src/core/contracts/auth/auth.dto";
import { IAuthService } from "src/core/contracts/auth/auth.services";
import {User} from "../core/businesses/user/user.model";
import { UpdatePasswordDto } from "src/core/businesses/user/user.dto";

export class AuthUseCases {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly authService: IAuthService
        ){}

    async signUpWithLocalStrategy(signupLocalDto: SignUpLocalDto): Promise<any>{
            const userExist = await this.userRepository.findByEmail(signupLocalDto.email);
            if(userExist){
                throw new ConflictException(`User ${signupLocalDto.email} already exists`);
            }
            const hashedPassword = await this.authService.hashedContent(signupLocalDto.password);
            const user = await this.userRepository.insert({
                ...signupLocalDto,
                password: hashedPassword
            });
            return this.authService.generateAccessAndRefreshToken(user.id);

    }
    async logInWithLocalStrategy(id: string): Promise<any> {
        return this.authService.generateAccessAndRefreshToken(id);
    }
    async loginWithGoogleStrategy(profile: any): Promise<any> {
        const {email, name } = profile;
        console.log(profile);
        const user = await this.userRepository.findByEmail(email);
        if(user){
            return this.authService.generateAccessAndRefreshToken(user.id);
        }
        const newUser = await this.userRepository.insert({ name, email});
        return this.authService.generateAccessAndRefreshToken(newUser.id);
    }
    async refreshToken(user: User){
        return {
            accessToken: await this.authService.generateAccessToken(user.id)
        };
    }
    async updatePassword(updatePasswordDto: UpdatePasswordDto){
        const user = await this.userRepository.findByEmail(updatePasswordDto.email);
        if(!user){
            throw new ConflictException(`User ${updatePasswordDto.email} does not exist`);
        }
        if(!await this.authService.compareHashedContent(updatePasswordDto.password, user.password)){
            throw new ConflictException(`Password is not correct`);
        }
        const hashedPassword = await this.authService.hashedContent(updatePasswordDto.newPassword);
        await this.userRepository.update(user.id, {password: hashedPassword});
        return this.authService.generateAccessAndRefreshToken(user.id);
    }
}