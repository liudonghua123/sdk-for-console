import { Client } from './client';
import type { Payload } from './client';
import { Query } from './query';

export class Service {
    static CHUNK_SIZE = 5*1024*1024; // 5MB

    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    static flatten(data: Payload, prefix = ''): Payload {
        let output: Payload = {};

        for (const [key, value] of Object.entries(data)) {
            let finalKey = prefix ? prefix + '[' + key +']' : key;
            if (Array.isArray(value)) {
                output = { ...output, ...Service.flatten(value, finalKey) };
            } else if (value instanceof Query) {
                output[finalKey] = JSON.stringify(value);
            } else {
                output[finalKey] = value;
            }
        }

        return output;
    }
}