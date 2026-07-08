import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){}

    async getAll(){
        return this.userRepository.find();
    }

    async createUser(user: Partial<User>): Promise<User> {
        
        const newUser = this.userRepository.create({...user,role:"user"})
        return await this.userRepository.save(newUser);
    }

    async getById(id:number):Promise<User>{

        const user = await this.userRepository.findOneBy({id});
        if(!user){
             throw new NotFoundException('USER NOT FOUND!');
        }
        return user;

    }
}
