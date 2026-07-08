import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEmail, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsString()
    name?: string;
    @IsEmail()
    email?: string;

    @IsStrongPassword()
    password?: string
}