import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/profile/profile.shema';
import { CreateProfileDto } from './dto/createProfile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
    ) {}

    async getById(userId: string) {
        const user = await this.profileModel
            .findOne({ owner: userId })
            .populate('User');
        return user;
    }

    async create(createProfileDto?: CreateProfileDto) {
        // if (!userId) {
        //     throw new HttpException(
        //         PROFILE_NOT_CREATED,
        //         HttpStatus.NOT_MODIFIED,
        //     );
        // }

        const createdProfile = new this.profileModel({
            firstname: '',
            lastname: '',
            city: '',
            about: '',
            ...createProfileDto,
        });

        return await createdProfile.save();
    }
}
