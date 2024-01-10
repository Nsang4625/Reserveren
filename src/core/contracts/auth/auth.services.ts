import {User} from "../../businesses/user/user.model";

export abstract class IAuthService {

    abstract hashedContent(content: string): Promise<string>;
    abstract generateAccessToken(id: string): Promise<string>;
    abstract generateRefreshToken(id: string): Promise<string>;
    abstract generateAccessAndRefreshToken(id: string): Promise<{
        accessToken: string,
        refreshToken: string
    }>
}