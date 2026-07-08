import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    createUser(data: Partial<User>): Promise<User>;
}
