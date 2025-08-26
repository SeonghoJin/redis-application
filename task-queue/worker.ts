import { client } from "../common/index.js";

const MAIN_QUEUE = 'email_queue';

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

async function processTask() {
    while (true) {
        try {
            const task_str = await client.rPop(MAIN_QUEUE);
            console.log('task', task_str)
            if (task_str === null) {
                await sleep(5000);
                continue;
            }
            console.log('start');
            await sleep(1000 * 5);
            console.log(task_str, "성공")
        } catch (e) {
            console.log("사용자에게 To. 메일 전송 실패")
        }
    }
}

processTask();