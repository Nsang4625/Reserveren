import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/core/businesses/user/user.schema.repo";
import { UserEntity } from "./user.entity";
import { User } from "src/core/businesses/user/user.model";
import { Repository } from "typeorm";


@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private readonly users: Repository<UserEntity>){}
    async insert(user: User): Promise<User>{
        return this.users.save(user);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.findOne({
            where: {
                email
            }
        })
    }
    async update(id: string, payload: any): Promise<User> {
        await this.users.update(id, {...payload} );
        return await this.users.findOne({
            where: {
                id
            }
        });
    }
    async updateRefreshToken(id: string, refreshToken: string): Promise<User>{
        return await this.update(id, {refreshToken});
    }
    async findById(id: string): Promise<User> {
        return this.users.findOne({
            where: {
                id,
            }
        })
    }
}