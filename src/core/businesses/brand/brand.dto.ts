import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateBrandDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    website: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
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