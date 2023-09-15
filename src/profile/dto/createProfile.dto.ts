import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    firstname?: string;

    @IsString()
    @IsOptional()
    lastname?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    about?: string;
}
