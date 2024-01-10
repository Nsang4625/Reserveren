import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Max, MaxLength } from 'class-validator';


export class SignUpLocalDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()  
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}

