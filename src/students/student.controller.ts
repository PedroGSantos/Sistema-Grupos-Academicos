import { StudentService } from './student.service';
import { Request, Response, Router } from 'express';
import { handleError } from '../errors/handle-error';

const studentService = new StudentService();

export class StudentController {
    public path = '/students';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async findById(request: Request, response: Response) {
        return await studentService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findStudentAcademicGroups(request: Request, response: Response) {
        return await studentService
            .findStudentAcademicGroups(parseInt(request.params.ra))
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findStudentAcademicGroupsHistory(
        request: Request,
        response: Response,
    ) {
        return await studentService
            .findStudentAcademicGroupsHistory(parseInt(request.params.ra))
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findStudentsInDeactivatedAcademicGroups(response: Response) {
        return await studentService
            .findStudentsInDeactivatedAcademicGroups()
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async create(request: Request, response: Response) {
        return await studentService
            .create(
                request.body.name,
                request.body.email,
                request.body.cpf,
                request.body.birthDate,
                request.body.password,
                request.body.department_id,
            )
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.post(this.path, this.create);
        this.router.get(`${this.path}/:id/data`, this.findById);
        this.router.get(
            `${this.path}/deactivatedGroups`,
            this.findStudentsInDeactivatedAcademicGroups,
        );
        this.router.get(
            `${this.path}/:ra/activeGroups`,
            this.findStudentAcademicGroups,
        );
        this.router.get(
            `${this.path}/:ra/history`,
            this.findStudentAcademicGroupsHistory,
        );
    }
}
