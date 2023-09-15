import { Type } from 'class-transformer';
import {
    IsString,
    MinLength,
    MaxLength,
    IsObject,
    IsOptional,
} from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/createProfile.dto';

export class RegisterDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    login: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    password: string;

    @IsObject()
    @IsOptional()
    @Type(() => CreateProfileDto)
    profile?: CreateProfileDto;
}
