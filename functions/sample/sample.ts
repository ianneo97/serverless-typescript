import { APIGatewayEvent } from 'aws-lambda';
import { LambdaResponse } from '../types/types';

export const lambdaHandler = async (
    event: APIGatewayEvent
): Promise<LambdaResponse> => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify({ event }),
    };
};
