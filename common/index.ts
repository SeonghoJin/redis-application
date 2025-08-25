import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

dotenv.config();

export const client = createClient({
    username: 'default',
    password: process.env.PASSWORD,
    socket: {
        host: process.env.HOST,
        port: Number(process.env.PORT) || -1
    }
});
