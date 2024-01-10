import { User } from './user.model';

export abstract class IUserRepo{
    abstract insert(user: User): Promise<User>;
    abstract update(id: string, payload: any): Promise<User>;
    abstract findByEmail(email: string): Promise<User>;
    abstract findById(id: string): Promise<User>;
    abstract updateRefreshToken(id: string, refreshToken: string): Promise<User>;
}