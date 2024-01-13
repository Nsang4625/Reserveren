import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user/user.repo";

@Injectable()
export class OwnerRoleGuard implements CanActivate {
    constructor(
         private userRepository: UserRepository
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const brandId = request.params.id || request.body.brandId;
        const user = await this.userRepository.findByIdWithBrand(request.user.id);
        for(let i = 0; i < user.brandUser.length; i++){
            if(user.brandUser[i].role === 'owner' && user.brandUser[i].brandId === Number(brandId) )
                return true;
        }
        return false;
    }
}