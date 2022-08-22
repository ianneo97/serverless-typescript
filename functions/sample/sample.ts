import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { Context } from 'aws-lambda';
import { ValidatedEvent } from '../lib/api-gateway';
import { logger } from '../lib/logger';
import middleware from '../lib/middleware';
import { ReqSchema, RespSchema } from './schema';

const lambdaHandler = async (
    event: ValidatedEvent<ReqSchema>,
    context: Context
): Promise<RespSchema> => {
    logger.defaultMeta = { requestId: context.awsRequestId };

    const body = event.body;

    return body;
};

export const handler = middy(lambdaHandler)
    .use(middleware())
    .use(httpErrorHandler());
