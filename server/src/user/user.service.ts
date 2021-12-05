import { Injectable } from '@nestjs/common';
import { UserRepository } from './entities/user.repository';
import { monoString } from 'mono-utils-core';
import User from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async findOneUserByField(field: keyof User, value: any) {
        return await this.userRepository.findOneUserByField(field, value);
    }

    async getAllUser(pageIndex: number, pageSize: number) {
        const query = await this.userRepository
            .createQueryBuilder()
            .select(monoString.getSelectQueryString<User>(['id', 'name', 'email', 'createDate']))
            .skip(pageIndex * pageSize)
            .take(pageSize);

        return query.getRawMany();
    }

    async save(input: User): Promise<User> {
        return await this.userRepository.save(input);
    }
}
