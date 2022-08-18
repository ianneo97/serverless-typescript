import { APIGatewayEvent, Context } from 'aws-lambda';
import { logger } from '../lib/logger';
import { okResponse } from '../lib/response';
import { LambdaResponse } from '../types/types';

export const lambdaHandler = async (
    event: APIGatewayEvent,
    context: Context
): Promise<LambdaResponse> => {
    logger.defaultMeta = { requestId: context.awsRequestId };

    return okResponse(context, 'Test function', { test: 123 });
};
