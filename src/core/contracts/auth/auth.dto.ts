import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Max, MaxLength } from 'class-validator';


export class SignUpLocalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty()
    @IsNotEmpty()  
    @IsEmail() 
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}

