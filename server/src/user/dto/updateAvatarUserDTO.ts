import { Field, InputType } from '@nestjs/graphql';
import * as Joi from 'joi';
import { userJoiSchema } from '../../core/utils/validator/schema/user.validator';
import { ValidatorService } from '../../core/utils/validator/validator.service';
import User from '../entities/user.entity';
const { getJoiSchemas } = ValidatorService.joiSchemaGenerator<User>(userJoiSchema);

@InputType({ description: 'update avatar' })
export class UpdateAvatarUserDTO {
    @Field()
    avatarUrl: string;
}

export const vUpdateAvatarUserDTO = Joi.object({
    ...getJoiSchemas(['avatarUrl']),
});
