import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FileService } from 'src/file/file.service';
import { File } from 'src/file/file.entity';
import { UserController } from './user.controller';
@Module({
  imports:[TypeOrmModule.forFeature([User,File]),
  AuthModule],
  providers: [UserService,FileService],
  controllers:[UserController],
})
export class UserModule {}
