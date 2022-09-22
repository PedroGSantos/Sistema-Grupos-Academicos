import { AcademicGroupService } from './academic-groups.service';
import { Router } from 'express';
import { verifyJwt } from '../middlewares/verifyjwt';

export class AcademicGroupController {
    private academicGroupService = new AcademicGroupService();

    public path = '/academic-groups';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.get(this.path, this.academicGroupService.findById);
        this.router.get(
            `${this.path}/byName`,
            this.academicGroupService.findMany,
        );
        this.router.post(this.path, this.academicGroupService.create);
        this.router.patch(
            `${this.path}/addStudent`,
            this.academicGroupService.addStudent,
        );
        this.router.patch(
            `${this.path}/deactivate`,
            verifyJwt,
            this.academicGroupService.deactivate,
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
    }
}
