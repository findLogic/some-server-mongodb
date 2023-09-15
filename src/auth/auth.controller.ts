import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { ProfileService } from 'src/profile/profile.service';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private profileService: ProfileService,
    ) {}

    @Get('/onlyauth')
    @JwtGuard()
    async hiddenInformation() {
        return 'hidden information';
    }

    @Get('/anyone')
    async publicInformation() {
        return 'this can be seen by anyone';
    }

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
        const user = await this.userService.create(registerDTO);
        const payload = {
            login: user.login,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
        const user = await this.userService.findByLogin(UserDTO);
        const payload = {
            login: user.login,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
