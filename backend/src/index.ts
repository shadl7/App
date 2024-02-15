require('dotenv').config()
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import {router} from './router';
import {errorMW} from './middlewares/error-middleware';

import https from "https";
import fs from 'fs';
const privateKey  = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('fullchain.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMW);
// TODO: webpack dist
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/");
        app.listen(7000);
        https.createServer(credentials, app).listen(PORT,
            () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()
