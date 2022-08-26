import express, { Express } from 'express';
import { AcademicGroupController } from './academic-groups/academic-groups.controller';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(process.env.PORT || 3000);
