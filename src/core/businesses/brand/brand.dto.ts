import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateBrandDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    website: string;

    @IsString()
    description: string;

    @IsEmail()
    email: string;
}

class UpdateBrandDto extends PartialType(CreateBrandDto){
    name?: string;
    description?: string;
    website?: string;
    email?: string;
}

export { CreateBrandDto, UpdateBrandDto };