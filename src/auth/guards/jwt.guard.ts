import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {}

export function JwtGuard() {
    return applyDecorators(UseGuards(JwtAuthGuard));
}
