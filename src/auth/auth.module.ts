import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
    imports: [UserModule, ProfileModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
