import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateRoomOptionDto {
    @ApiProperty()
    @IsString()
    option: string;

    @ApiProperty()
    @IsNumber()
    price: number;
}

export class UpdateRoomOptionDto extends PartialType(CreateRoomOptionDto) {}