import { wrapValidatorAsTypeGuard, JSONSchema } from 'json-schema-to-ts';
import Ajv from 'ajv';
import { InvalidPayloadError } from './errors';

export const ajv = new Ajv();

function $validateWithOptions<T extends JSONSchema>(
    schema: T,
    data: unknown,
    shouldThrowError = true
): boolean {
    const isValid = ajv.validate<T>(schema, data);

    if (isValid) {
        return true;
    }

    if (shouldThrowError) {
        throw new InvalidPayloadError(
            'Invalid payload for the request, please check the request body and try again'
        );
    }

    return false;
}

export const validate = wrapValidatorAsTypeGuard($validateWithOptions);
