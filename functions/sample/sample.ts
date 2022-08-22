import { Context } from 'aws-lambda';
import { FromSchema } from 'json-schema-to-ts';
import { ValidatedEvent } from '../lib/api-gateway';
import { logger } from '../lib/logger';
import { middyfy } from '../lib/middyfier';
import { validate } from '../lib/validator';
import { requestSchema, responseSchema } from './schema';

const lambdaHandler = async (
    event: ValidatedEvent<typeof requestSchema>,
    context: Context
): Promise<FromSchema<typeof responseSchema>> => {
    logger.defaultMeta = { requestId: context.awsRequestId };

    validate(requestSchema, event.body);

    const body = event.body;

    return body;
};

export const handler = middyfy(lambdaHandler);
