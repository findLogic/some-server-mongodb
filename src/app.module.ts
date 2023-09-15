import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            dbName: 'some_db_name',
        }),
        UserModule,
        AuthModule,
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
