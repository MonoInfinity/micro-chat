import { Injectable } from '@nestjs/common';
import { UserRepository } from './entities/user.repository';
import User from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async findOneUserByField(field: keyof User, value: any) {
        return await this.userRepository.findOneUserByField(field, value);
    }

    async save(input: User): Promise<User> {
        return await this.userRepository.save(input);
    }
}
