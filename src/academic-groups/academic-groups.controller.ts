import { AcademicGroupService } from './academic-groups.service';
import { Request, Response, Router } from 'express';
import { verifyJwt } from '../middlewares/verifyjwt';
import { handleError } from '../errors/handle-error';

export class AcademicGroupController {
    private academicGroupService = new AcademicGroupService();

    public path = '/academic-groups';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async findById(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findManyByName(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findMany(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async create(request: Request, response: Response) {
        return await this.academicGroupService
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
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async deactivate(request: Request, response: Response) {
        return await this.academicGroupService
            .deactivate(request.query.id as string, request.body.user_id)
            .then(() => response.status(204).send())
            .catch((error) => handleError(response, error));
    }

    async changeResponsible(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async removeStudent(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findInvitedEventsById(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findParticipantsById(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findOrganizedEventsById(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findParticipantsWithSubjects(request: Request, response: Response) {
        return await this.academicGroupService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.get(this.path, this.academicGroupService.findById);
        this.router.get(
            `${this.path}/byName`,
            this.academicGroupService.findManyByName,
        );
        this.router.get(
            `${this.path}/list`,
            this.academicGroupService.findMany,
        );
        this.router.post(this.path, this.create);
        this.router.post(
            `${this.path}/addStudent`,
            this.academicGroupService.addStudent,
        );
        this.router.patch(
            `${this.path}/deactivate`,
            verifyJwt,
            this.deactivate,
        );
        this.router.patch(
            `${this.path}/changeResponsible`,
            verifyJwt,
            this.academicGroupService.changeResponsible,
        );
        this.router.delete(
            `${this.path}/removeStudent`,
            verifyJwt,
            this.academicGroupService.removeStudent,
        );
        this.router.get(
            `${this.path}/invitedEvents`,
            this.academicGroupService.findInvitedEventsById,
        );

        this.router.get(
            `${this.path}/participants`,
            this.academicGroupService.findParticipantsById,
        );

        this.router.get(
            `${this.path}/organizedEvents`,
            this.academicGroupService.findOrganizedEventsById,
        );

        this.router.get(
            `${this.path}/participantsAcademicGroupsWithSubjects`,
            this.academicGroupService.findParticipantsWithSubjects,
        );
    }
}
