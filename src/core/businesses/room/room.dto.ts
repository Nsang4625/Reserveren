import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateRoomDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    basePrice: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    maxCapacity: number;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto){}