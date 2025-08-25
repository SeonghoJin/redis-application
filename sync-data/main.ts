import { client } from "../common/index.js";
import { select, update } from "./db.js";


await client.connect();
console.time('start');

async function findOne(id: string) {
    const cachedData = await client.get(`data:${id}`);
    if (cachedData) {
        return cachedData;
    }

    const data = await select(id);
    await client.set(`data:${id}`, data, {
        expiration: {
            type: 'PX',
            value: 20000
        }
    });
    return data;
}

async function updateOne(id: string, payload: string) {
    const newData = payload;
    await update(id, payload);
    await client.set(`data:${id}`, newData, {
        expiration: {
            type: 'EX',
            value: 20,
        }
    })
    return newData;
}

const result = await findOne('2024');
console.log('Result:', result);
console.timeEnd('start');

// Redis 클라이언트 연결 종료
await client.close();