import { App } from './app';
import dotenv from 'dotenv';
import { AcademicGroupController } from './academic-groups/academic-groups.controller';
import { StudentController } from './students/student.controller';
import { ProfessorController } from './professors/professor.controller';
import { EventController } from './events/event-controller';
import { AuthController } from './auth/auth.controller';
import { RecruitmentProcessController } from './recruitment-processes/recruitment-process.controller';
import { PhaseController } from './phases/phase.controller';

dotenv.config();
const port = process.env.PORT || 3000;

const app = new App(
    [
        new AcademicGroupController(),
        new StudentController(),
        new ProfessorController(),
        new AuthController(),
        new EventController(),
        new RecruitmentProcessController(),
        new PhaseController(),
    ],
    port as number,
);

app.listen();
