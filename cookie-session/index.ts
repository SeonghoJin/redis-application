import express from 'express';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { client } from '../common/index.js';

const app = express();

app.listen(3000, () => { console.log('server is  runnig on 3000') });

app.use(session({
    store: new RedisStore({
        client,
    }),
    secret: 'session_secret',
    name: 'inflearn_study',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60,
    }
}))

app.use((req, res, next) => {
    console.log(req.session)
    console.log("요청 들어왔어요!");
    next();
})

app.post('/', (req, res) => {
    res.json({
        data: 'hello-world'
    })
})

app.get('/', (req, res) => {
    console.log(req);

    res.json({
        data: "hello wolrd"
    });
})