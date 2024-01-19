import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateHotelDto{
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    minPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    longitude: number;

    @ApiProperty()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty()
    @IsNotEmpty()
    brandId: number;
}

export class UpdateHotelDto extends PartialType(CreateHotelDto){}