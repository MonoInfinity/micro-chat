import { UseGuards } from '@nestjs/common';
import { Context, Resolver, Query, Args } from '@nestjs/graphql';
import { Request } from 'express';
import { UserGuard } from '../auth/auth.guard';
import { UserSchema } from './entities/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(UserGuard)
    @Query(() => UserSchema)
    async getCurrentUser(@Context('req') req: Request): Promise<UserSchema> {
        const user = await this.userService.findOneUserByField('id', req.user.id);

        return {
            name: user.name,
            createDate: user.createDate,
            email: user.email,
            id: user.id,
        };
    }

    @UseGuards(UserGuard)
    @Query(() => [UserSchema])
    async getAllUsers(@Args('first') first: number): Promise<UserSchema[]> {
        const users = await this.userService.getAllUser(0, first);

        return users.map((user) => {
            return {
                name: user.name,
                createDate: user.createDate,
                email: user.email,
                id: user.id,
            };
        });
    }
}
