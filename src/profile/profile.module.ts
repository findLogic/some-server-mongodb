import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/profile/profile.shema';
import { ProfileService } from './profile.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Profile.name, schema: ProfileSchema },
        ]),
    ],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
