import { Repository } from 'typeorm';
import { File } from './file.entity';
export declare class FileService {
    private readonly fileRepository;
    constructor(fileRepository: Repository<File>);
    createFile(file: Partial<File>): Promise<File>;
    getAllFile(): Promise<File[]>;
    getOne(id: number): Promise<File>;
}
