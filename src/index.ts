import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import { connect } from './dbconfig/config';
// import mongooseConnect from './dbconfig/config'

const app = express();

app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
})

connect()

app.use('/', router())