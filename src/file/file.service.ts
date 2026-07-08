import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File) 
        private readonly fileRepository: Repository<File>
    ){}

    async createFile(file: Partial<File>): Promise<File> {
        // 1. Used new Date() for timestamp compatibility
        const newFile = this.fileRepository.create({
            ...file,
            uploadedAt: new Date(), 
        });

        return await this.fileRepository.save(newFile);
    }

    async getAllFile(): Promise<File[]> {
        return await this.fileRepository.find();
    }

    async getOne(id: number): Promise<File> {
        
        const file = await this.fileRepository.findOne({ 
            where: { id } 
        });
        
        if (!file) {
            throw new NotFoundException("FILE NOT FOUND!");
        }
        return file;
    }
}
