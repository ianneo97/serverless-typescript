import { APIGatewayProxyEvent } from 'aws-lambda';
import { JSONSchema } from 'json-schema-to-ts';

export type ValidatedEvent<T extends JSONSchema> = Omit<
    APIGatewayProxyEvent,
    'body'
> & {
    body: T;
};
