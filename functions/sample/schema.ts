import { FromSchema } from 'json-schema-to-ts';

export const requestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
    },
    required: ['name'],
} as const;

export const responseSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
    },
    required: ['name'],
} as const;

export type RespSchema = FromSchema<typeof responseSchema>;
export type ReqSchema = FromSchema<typeof requestSchema>;
