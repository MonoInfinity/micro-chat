import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
//* Internal import

@Catch(UserInputError)
export class GraphqlExceptionHandler implements ExceptionFilter {
    catch(exception: HttpException) {
        return exception;
    }
}
