import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('register')
    register(@Body() body: Partial<User>) {
        return this.authService.register(body);
    }


    @Post('login')
    login(@Body() body: Partial<User>){
        return this.authService.login(body);
    }

}