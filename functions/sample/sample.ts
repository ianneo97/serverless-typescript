import { Context } from 'aws-lambda';
import { ValidatedEvent } from '../lib/api-gateway';
import { logger } from '../lib/logger';
import { middyfy } from '../lib/middyfier';
import { ReqSchema, RespSchema } from './schema';

const lambdaHandler = async (
    event: ValidatedEvent<ReqSchema>,
    context: Context
): Promise<RespSchema> => {
    logger.defaultMeta = { requestId: context.awsRequestId };

    const body = event.body;

    return body;
};

export const handler = middyfy(lambdaHandler);
