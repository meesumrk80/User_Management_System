import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { File } from '../file/file.entity'; // Update the path if needed

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) { }

    // ================= CREATE USER =================

    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create({
            ...user,
            role: 'user',
            createdAt: new Date
        });

        return await this.userRepository.save(newUser);
    }

    // ================= GET ALL USERS =================

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    // ================= GET USER BY ID =================

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    // ================= UPDATE USER =================

    async updateUser(
        id: number,
        body: Partial<User>,
    ): Promise<User> {
        const user = await this.getById(id);

        Object.assign(user, body);

        return await this.userRepository.save(user);
    }

    // ================= DELETE USER =================

    async deleteUser(id: number) {
        const user = await this.getById(id);

        await this.userRepository.remove(user);

        return {
            message: 'User deleted successfully',
        };
    }

    // ================= UPLOAD FILE =================

    async uploadFile(
        userId: number,
        uploadedFile: Express.Multer.File,
    ) {
        const user = await this.getById(userId);
        const file = this.fileRepository.create({
            filename: uploadedFile.filename,
            originalName: uploadedFile.originalname,
            mimeType: uploadedFile.mimetype,
            size: uploadedFile.size,
            path: uploadedFile.path,
            user: user,
        });

        return await this.fileRepository.save(file);
    }

    // ================= GET USER FILES =================

    async getUserFiles(userId: number) {
        const user = await this.getById(userId);

        return user.files;
    }

    // ================= DELETE FILE =================

    async deleteFile(fileId: number) {
        const file = await this.fileRepository.findOne({
            where: { id: fileId },
        });

        if (!file) {
            throw new NotFoundException('File not found');
        }

        await this.fileRepository.remove(file);

        return {
            message: 'File deleted successfully',
        };
    }
}