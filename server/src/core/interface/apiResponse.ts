import { UserInputError } from 'apollo-server-express';
import { BodyDetails } from './api.interface';

class ApiResponse {
    constructor() {
        //
    }

    /**
     *
     * @description
     */
    public send<T>(data: T, details: BodyDetails) {
        return { details: JSON.stringify(details), data };
    }

    /**
     *
     * @description
     */
    public sendError(statusCode: number, details: BodyDetails) {
        throw new UserInputError('error', { statusCode, details });
    }
}

export const apiResponse = new ApiResponse();
