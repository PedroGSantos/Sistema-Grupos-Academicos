import express, { Express } from 'express';
import { AcademicGroupController } from './academic-groups/academic-groups.controller';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const academicGroupController = new AcademicGroupController();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', (req, res) => {
    return res.status(200).send(academicGroupController.create());
});

app.listen(process.env.PORT || 3000);
