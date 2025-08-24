import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

dotenv.config();

const client = createClient({
    username: 'default',
    password: process.env.PASSWORD,
    socket: {
        host: process.env.HOST,
        port: Number(process.env.PORT) || -1
    }
});

client.on('error', (err: any) => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');

async function generateOTP(userId: string) {
    const otp = Math.round(Math.random() * 99999).toString().padStart(6, "0");

    try {
        await client.set(`otp:${userId}`, otp, {
            expiration: {
                type: 'EX',
                value: 5
            }
        });
        return otp;
    } catch (e) {
        console.log(e);
        return "error"
    }
}

async function verifyOTP(userId: string, inputOTP: string) {
    const userOTP = await client.get(`otp:${userId}`);

    if (inputOTP === userOTP) {
        await client.del(`otp:${userId}`);
        return true;
    }

    return false;
}

generateOTP('1').then(otp => {
    const temp = otp;
    console.log("temp: ", temp);

    setInterval(() => {
        client.pTTL(`otp:1`).then((res) => {
            console.log(res);
        })
    }, 1000)

    rl.question('your otp ?? : ', (input) => {
        verifyOTP("1", input).then(result => console.log(result));
        rl.close();
    })
})