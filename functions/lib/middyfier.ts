import middy, { MiddyfiedHandler } from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { Handler } from 'aws-lambda';
import middleware from './middleware';

export function middyfy(handler: Handler): MiddyfiedHandler {
    return middy(handler).use(middleware()).use(httpErrorHandler());
}
