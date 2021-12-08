import { Field, InputType } from '@nestjs/graphql';
import * as Joi from 'joi';
import User from '../../user/entities/user.entity';
import { userJoiSchema } from '../../core/utils/validator/schema/user.validator';
import { ValidatorService } from '../../core/utils/validator/validator.service';

const { getJoiSchemas } = ValidatorService.joiSchemaGenerator<User>(userJoiSchema);

@InputType({ description: 'update user information' })
export class UpdateUserDTO {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;
}

export const vUpdateUserDTO = Joi.object({
    ...getJoiSchemas(['name', 'email']),
});
