import 'reflect-metadata';
import express from 'express';
import createConnection from './database'
import {router} from './routes'
const app = express();

app.use(express.json())


createConnection()
app.use(router)

export { app }