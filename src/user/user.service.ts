import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types, Document } from 'mongoose';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { User } from 'src/user/user.schema';
import { ProfileService } from 'src/profile/profile.service';
import { Payload } from 'src/types/payload';
import {
    INVALID_CREDENTIAL,
    NO_LOGIN,
    USER_ALREADY_EXISTS,
    USER_DOESNT_EXISTS,
} from './consts/user.consts';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly profileService: ProfileService,
    ) {}

    async create(registerDTO: RegisterDTO) {
        const { login, profile } = registerDTO;

        if (!login) {
            throw new HttpException(NO_LOGIN, HttpStatus.BAD_REQUEST);
        }

        const user = await this.userModel.findOne({ login });

        if (user) {
            throw new HttpException(
                USER_ALREADY_EXISTS,
                HttpStatus.BAD_REQUEST,
            );
        }

        let createdUser: Document<unknown, User> &
            User & {
                _id: Types.ObjectId;
            };

        await this.profileService
            .create({
                about: profile.about ?? '',
                city: profile.city ?? '',
                firstname: profile.firstname ?? '',
                lastname: profile.lastname ?? '',
            })
            .then(async (data) => {
                createdUser = await new this.userModel({
                    profile: data._id,
                    login: registerDTO.login,
                    password: registerDTO.password,
                }).populate('profile');
            });

        createdUser = await createdUser.save();

        return this.sanitizeUser(createdUser);
    }

    async findByPayload(payload: Payload) {
        const { login } = payload;
        return await this.userModel.findOne({ login }).populate('profile');
    }

    async findByLogin(UserDTO: LoginDTO) {
        const { login, password } = UserDTO;
        const user = await this.userModel
            .findOne({ login })
            .populate('profile');

        console.log(user);
        if (!user) {
            throw new HttpException(USER_DOESNT_EXISTS, HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException(INVALID_CREDENTIAL, HttpStatus.BAD_REQUEST);
        }
    }

    async lol(login: string) {
        const user = await this.userModel
            .findOne({ login })
            .populate('profile');
        return user;
    }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
}
