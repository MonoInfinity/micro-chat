import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema, ValidationError } from 'joi';
import { StatusCodes } from 'http-status-codes';
//---- Common
import { apiResponse } from '../../interface/apiResponse';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
    constructor(private readonly schema: ObjectSchema) {}

    transform(input: any) {
        if (!input) throw apiResponse.sendError(StatusCodes.BAD_REQUEST, { errorMessage: 'Invalid input' });
        const { error, value } = this.schema.validate(input, { abortEarly: false });
        if (error) throw apiResponse.sendError(StatusCodes.BAD_GATEWAY, this.mapJoiError(error));

        return value;
    }

    mapJoiError(errors: ValidationError) {
        const errorObj = {};
        for (const item of errors.details) errorObj[item.context.key] = { errorMessage: item.message };

        return errorObj;
    }
}
