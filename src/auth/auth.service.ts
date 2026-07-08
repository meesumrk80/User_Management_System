import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }



    async register(data: Partial<User>) {

        const hashedPassword =
            await bcrypt.hash(data.password, 10);


        const user =
            await this.userService.createUser({
                ...data,
                password: hashedPassword
            });


        return {
            message: "User registered",
            user
        };
    }



    async login(data: Partial<User>) {

        const user =
        await this.userRepository.findOneBy({ email: data.email });

        if (!user) {
            throw new UnauthorizedException(
                "Invalid credentials"
            );
        }


        const match =
            await bcrypt.compare(
                data.password,
                user.password
            );


        if (!match) {
            throw new UnauthorizedException(
                "Invalid credentials"
            );
        }



        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };


        return {
            access_token:
                await this.jwtService.signAsync(payload)
        };

    }

}