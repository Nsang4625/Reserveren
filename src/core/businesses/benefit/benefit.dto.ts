import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateBenefitDto {
    @ApiProperty()
    @IsString()
    value: string;
}

export class UpdateBenefitDto extends PartialType(CreateBenefitDto) {}