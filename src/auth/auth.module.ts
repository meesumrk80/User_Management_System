import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  providers: [
    JwtGuard,
    AuthService
  ],

  exports: [
    JwtModule,
    JwtGuard,
  ],

  controllers: [AuthController],
})
export class AuthModule {}