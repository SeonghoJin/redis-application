import cluster from "cluster";
import express from "express";
import { client } from "../common/index.js";

const app = express();

const MAIN_QUEUE = 'email_queue';
const SOME_QUEUE = 'some_queue';

app.use(express.json());

app.post('/mail/send', (req, res) => {
    const { email, message } = req.body;

    const task = {
        taskId: Math.round(Math.random() * 1000),
        email,
        message,
        createdAt: Date.now()
    }


    client.lPush(MAIN_QUEUE, JSON.stringify(task))
        .then(() => {
            res.status(202).json({
                data: "success"
            })
        }).catch((e) => {
            res.status(500).json({
                data: 'fail'
            })
        })
})

app.listen(3000, () => { console.log('server is runnig on 3000') });

