import { FromSchema } from 'json-schema-to-ts';

const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
    },
    required: ['name'],
} as const;

export type Schema = FromSchema<typeof schema>;
