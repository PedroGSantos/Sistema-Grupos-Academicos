import { AcademicGroupService } from './academic-groups.service';
import { Request, Response, Router } from 'express';
import { verifyJwt } from '../middlewares/verifyjwt';
import { handleError } from '../errors/handle-error';

const academicGroupService = new AcademicGroupService();

export class AcademicGroupController {
    public path = '/academic-groups';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async findById(request: Request, response: Response) {
        return await academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findManyByName(request: Request, response: Response) {
        return await academicGroupService
            .findById(request.query.name as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findMany(request: Request, response: Response) {
        return await academicGroupService
            .findById(request.query.page as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async create(request: Request, response: Response) {
        return await academicGroupService
            .create(
                request.query.name as string,
                request.query.description as string,
                request.query.departmentId as string,
                request.query.responsibleId as string,
                parseInt(request.query.participantsLimit as string),
            )
            .then((groupFound) => response.status(201).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async addStudent(request: Request, response: Response) {
        return await academicGroupService
            .addStudent(request.body.academicGroupId, request.body.studentId)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async deactivate(request: Request, response: Response) {
        return await academicGroupService
            .deactivate(request.query.id as string, request.body.user_id)
            .then(() => response.status(204).send())
            .catch((error) => handleError(response, error));
    }

    async changeResponsible(request: Request, response: Response) {
        return await academicGroupService
            .changeResponsible(
                request.body.academicGroupId,
                request.body.newResponsibleId,
                request.body.user_id,
            )
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async removeStudent(request: Request, response: Response) {
        return await academicGroupService
            .removeStudent(
                request.body.academicGroupId,
                request.body.studentId,
                request.body.user_id,
            )
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findInvitedEventsById(request: Request, response: Response) {
        return await academicGroupService
            .findInvitedEventsById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findParticipantsById(request: Request, response: Response) {
        return await academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findOrganizedEventsById(request: Request, response: Response) {
        return await academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findParticipantsWithSubjects(request: Request, response: Response) {
        return await academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.get(this.path, this.findById);
        this.router.get(`${this.path}/byName`, this.findManyByName);
        this.router.get(`${this.path}/list`, this.findMany);
        this.router.post(this.path, this.create);
        this.router.post(`${this.path}/addStudent`, this.addStudent);
        this.router.patch(
            `${this.path}/deactivate`,
            verifyJwt,
            this.deactivate,
        );
        this.router.patch(
            `${this.path}/changeResponsible`,
            verifyJwt,
            this.changeResponsible,
        );
        this.router.delete(
            `${this.path}/removeStudent`,
            verifyJwt,
            this.removeStudent,
        );
        this.router.get(
            `${this.path}/invitedEvents`,
            this.findInvitedEventsById,
        );

        this.router.get(`${this.path}/participants`, this.findParticipantsById);

        this.router.get(
            `${this.path}/organizedEvents`,
            this.findOrganizedEventsById,
        );

        this.router.get(
            `${this.path}/participantsAcademicGroupsWithSubjects`,
            this.findParticipantsWithSubjects,
        );
    }
}
