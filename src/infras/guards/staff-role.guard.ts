import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user/user.repo";
import { Observable } from "rxjs";

@Injectable()
export class StaffRoleGuard implements CanActivate{
    constructor(private readonly userRepository: UserRepository){}
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const brandId = request.params.brandId ? request.params.brandId : request.params.id;
        const user = await this.userRepository.findByIdWithBrand(request.user.id);
        for(let i = 0; i < user.brandUser.length; i++){
            if(user.brandUser[i].brandId === Number(brandId) )
                return true;
        }
        console.log(brandId)
        return false;
    }
}