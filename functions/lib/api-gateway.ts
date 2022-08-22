import { APIGatewayProxyEvent } from 'aws-lambda';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export type ValidatedEvent<T extends JSONSchema> = Omit<
    APIGatewayProxyEvent,
    'body'
> & {
    body: FromSchema<T>;
};
