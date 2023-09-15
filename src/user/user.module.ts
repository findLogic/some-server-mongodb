import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ProfileModule } from 'src/profile/profile.module';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ProfileModule,
    ],
    providers: [UserService],
    controllers: [],
    exports: [UserService],
})
export class UserModule {}
