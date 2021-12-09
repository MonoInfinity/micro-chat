import * as Joi from 'joi';

import { User } from '../../../../user/entities/user.entity';

export function userJoiSchema(field: keyof User) {
    switch (field) {
        case 'name':
            return Joi.string().min(5).max(40).trim().lowercase().required();

        case 'email':
            return Joi.string().min(5).max(255).email();
    }
}
