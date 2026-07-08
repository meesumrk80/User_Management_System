import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class FileDto {
    @IsString()
    @IsNotEmpty()
    name: string; 

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
