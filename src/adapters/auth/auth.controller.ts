import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {  SignUpLocalDto } from 'src/core/contracts/auth/auth.dto';
import { LocalAuthGuard } from 'src/infras/guards/local-auth.guards';
import { AuthUseCases } from 'src/usecases/auth.usecases';
import {GoogleAuthGuard} from "../../infras/guards/google-auth.guards";
import {JwtRefreshTokenGuards} from "../../infras/guards/jwt-refresh-auth.guards";
import { UpdatePasswordDto } from 'src/core/businesses/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authUseCases: AuthUseCases){}

    @Post('/signup')
    async signUpLocal(@Body() signupLocalDto: SignUpLocalDto){
        return this.authUseCases.signUpWithLocalStrategy(signupLocalDto);
    }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async logInLocal(@Req() request: any){
        const { user } = request;
        return this.authUseCases.logInWithLocalStrategy(user.id);
    }
    @Post('/updatePassword')
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto){
        return this.authUseCases.updatePassword(updatePasswordDto);
    }
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {}
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleGoogleOauthRedirect(@Req() request: any) {
        const { user } = request;
        return this.authUseCases.loginWithGoogleStrategy(user);
    }
    @UseGuards(JwtRefreshTokenGuards)
    @Post('/refresh')
    async refreshToken(@Req() request: any){
        const { user } = request;
        return this.authUseCases.refreshToken(user);
    }
}