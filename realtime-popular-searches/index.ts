import express from "express";
import { client } from "../common/index.js";
import qs from 'qs';

const app = express();

const SEARCH_BOARD = 'serach_board';


app.use(express.json());
app.use((req, res, next) => {
    req.query = qs.parse(req.query as unknown as string);
    next();
})


app.get("/search", async (req, res) => {
    const { search } = req.query;

    const data = [1, 2, 3];


    res.status(200).json(data);
    try {
        // 실시간 인기 검색어 순위 +
        await client.zIncrBy(SEARCH_BOARD, 1, search as string);
    } catch (err) {
        console.error(err);
    }
})


app.get('/board', async (req, res) => {
    const boradList = await client.zRange(SEARCH_BOARD, 0, 9, {})

    const result = [];
    for (let i = 0; i < boradList.length; i += 2) {
        result.push([boradList[i], boradList[i + 1]]);
    }
})
app.listen(3000, () => { console.log('server is runnig on 3000') });
