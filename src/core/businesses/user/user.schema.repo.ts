import { User } from './user.model';

export abstract class IUserRepo{
    abstract insert(user: User): Promise<User>;
    abstract findByEmail(email: string): Promise<User>;
    abstract updateRefreshToken(id: string, user: any): Promise<User>;
}