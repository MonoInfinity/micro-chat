import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema, ValidationError } from 'joi';
import { UserInputError } from 'apollo-server-express';

//---- Common
import { apiResponse } from '../../interface/apiResponse';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
    constructor(private readonly schema: ObjectSchema) {}

    transform(input: any) {
        if (!input) throw apiResponse.sendError(400, { errorMessage: 'Invalid input' });
        const { error, value } = this.schema.validate(input, { abortEarly: false });
        if (error) throw apiResponse.sendError(400, this.mapJoiError(error));

        return value;
    }

    mapJoiError(errors: ValidationError) {
        const errorObj = {};
        for (const item of errors.details) errorObj[item.context.key] = { errorMessage: item.message };

        return errorObj;
    }
}
