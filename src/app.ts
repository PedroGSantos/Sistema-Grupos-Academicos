import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(process.env.PORT || 3000);
