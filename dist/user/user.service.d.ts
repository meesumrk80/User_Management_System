import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<User[]>;
    createUser(user: Partial<User>): Promise<User>;
    getById(id: number): Promise<User>;
}
