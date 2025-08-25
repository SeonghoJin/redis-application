import { client } from "../common/index.js";

// client.setNX('some-key', 'some-value').then((res) => console.log(res));

const tickets: Record<string, number | string> = {
    'A': 1,
    'B': 1,
    'C': 1,
};

async function reserveTicket(userId: string, seat: string) {
    const lock = await client.set(`lock:ticket:${seat}`, userId,
        { condition: 'NX', expiration: { type: 'EX', value: 60 * 10 } }
    );

    if (!lock) {
        for (let i = 0; i < 3; i++) {
            console.log("락 획득 재도전!");
        }

        return false;
    }


    if (tickets[seat] === 1) {
        return false;
    }

    tickets[seat] = userId;
}
