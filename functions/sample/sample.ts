import { Context } from 'aws-lambda';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { ReqSchema, RespSchema } from './schema';
import middleware from '../lib/middleware';
import { ValidatedEvent } from '../lib/api-gateway';

const lambdaHandler = async (
    event: ValidatedEvent<ReqSchema>,
    _: Context
): Promise<RespSchema> => {
    const body = event.body;

    return body;
};

export const handler = middy(lambdaHandler)
    .use(middleware())
    .use(httpErrorHandler());
