import { UseGuards } from '@nestjs/common';
import { Context, Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UserGuard } from '../auth/auth.guard';
import { UserSchema } from './entities/user.schema';
import { UserService } from './user.service';
import { JoiValidatorPipe } from '../core/utils/validator/validator.pipe';
import { vUpdateUserDTO, UpdateUserDTO } from './dto/UpdateUserDTO';

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

    @Mutation(() => Boolean)
    @UseGuards(UserGuard)
    async updateUser(
        @Context('req') req: Request,
        @Context('res') res: Response,
        @Args('input', new JoiValidatorPipe(vUpdateUserDTO)) body: UpdateUserDTO
    ) {
        const user = await this.userService.findOneUserByField('id', req.user.id);

        //checking hash password
        user.name = body.name;
        user.email = body.email;

        await this.userService.save(user);
        return true;
    }
}
