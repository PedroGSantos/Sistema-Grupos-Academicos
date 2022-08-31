import { App } from './app';
import dotenv from 'dotenv';
import { AcademicGroupController } from './academic-groups/academic-groups.controller';
import { StudentController } from './students/student.controller';
import { ProfessorController } from './professors/professor.controller';

dotenv.config();
const port = process.env.PORT || 3000;

const app = new App(
    [
        new AcademicGroupController(),
        new StudentController(),
        new ProfessorController(),
    ],
    port as number,
);

app.listen();
