import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { logger } from '../lib/logger';
import { okResponse } from '../lib/response';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';

const lambdaHandler = async (
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    logger.defaultMeta = { requestId: context.awsRequestId };

    // const body: Schema = event.body;
    const body = event.body;
    console.log(body);

    return okResponse(context, 'Test function', body);
};

export const handler = middy(lambdaHandler).use(httpJsonBodyParser());
