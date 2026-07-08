import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { User } from './user.entity';

import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorator/roles/roles.decorator';
import { Role } from 'src/auth/enums/roles.enums';

import { multerOptions } from 'src/common/multer/multer.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ================= REGISTER USER =================

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user.name || !user.email || !user.password) {
      throw new BadRequestException('All fields are required');
    }

    return this.userService.createUser(user);
  }

  // ================= GET ALL USERS (ADMIN) =================

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  // ================= GET USER BY ID (ADMIN) =================

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(Number(id));
  }

  // ================= UPDATE USER =================

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(Number(id), body);
  }

  // ================= DELETE USER (ADMIN) =================

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  // ================= UPLOAD FILE =================

  @UseGuards(JwtGuard)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.userService.uploadFile(Number(id), file);
  }

  // ================= GET USER FILES =================

  @UseGuards(JwtGuard)
  @Get(':id/files')
  async getUserFiles(@Param('id') id: string) {
    return this.userService.getUserFiles(Number(id));
  }

  // ================= DELETE FILE =================

  @UseGuards(JwtGuard)
  @Delete('files/:fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    return this.userService.deleteFile(Number(fileId));
  }
}