import { Context } from 'aws-lambda';
import { LambdaResponse } from './../types/types';
import { logger } from './logger';

export function okResponse(
    context: Context,
    message: string,
    response: unknown
): LambdaResponse {
    logger.defaultMeta = { requestId: context.awsRequestId };

    logger.info(message, response);

    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(response),
    };
}

export function errResponse(
    context: Context,
    message: string,
    errorCode: number,
    error: Error
): LambdaResponse {
    logger.defaultMeta = { requestId: context.awsRequestId };

    logger.error(message, error);

    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: errorCode,
        body: JSON.stringify({
            message: error.message,
            stackTrace: error.stack,
        }),
    };
}
