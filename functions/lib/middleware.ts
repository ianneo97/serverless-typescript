import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
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
            body: JSON.stringify(request.response),
        };
    };

    return {
        before,
        after,
    };
};

export default middleware;
