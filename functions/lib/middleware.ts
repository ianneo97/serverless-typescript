import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ERROR_LIST } from './errors';
import { logger } from './logger';

const middleware = (): middy.MiddlewareObj<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
> => {
    const before: middy.MiddlewareFn<
        APIGatewayProxyEvent,
        APIGatewayProxyResult
    > = async (request): Promise<void> => {
        logger.defaultMeta = { requestId: request.context.awsRequestId };
        request.event.body = JSON.parse(request.event.body || '{}');

        logger.info('API Request Information', request.event);
    };

    const after: middy.MiddlewareFn<
        APIGatewayProxyEvent,
        APIGatewayProxyResult
    > = async (request): Promise<APIGatewayProxyResult> => {
        logger.defaultMeta = { requestId: request.context.awsRequestId };
        logger.info('API Response Information', request.response);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(request.response),
        };
    };

    const onError: middy.MiddlewareFn<
        APIGatewayProxyEvent,
        APIGatewayProxyResult
    > = async (request): Promise<APIGatewayProxyResult> => {
        logger.defaultMeta = { requestId: request.context.awsRequestId };
        logger.error('API Error Information', request.error);

        const statusCode =
            ERROR_LIST[request.error?.name || '']?.statusCode || 500;

        return {
            statusCode: statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name: request.error?.name || 'Internal Server Error',
                message:
                    request.error?.message ||
                    'Please contact administrator for help.',
                stack: request.error?.stack || null,
            }),
        };
    };

    return {
        before,
        after,
        onError,
    };
};

export default middleware;
