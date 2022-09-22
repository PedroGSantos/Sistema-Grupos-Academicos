import { AcademicGroupService } from './academic-groups.service';
import { Router } from 'express';

export class AcademicGroupController {
    private academicGroupService = new AcademicGroupService();

    public path = '/academic-groups';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.get(this.path, this.academicGroupService.findById);
        this.router.post(this.path, this.academicGroupService.create);
        this.router.patch(
            `${this.path}/addStudent`,
            this.academicGroupService.addStudent,
        );
        this.router.patch(
            `${this.path}/deactivate`,
            this.academicGroupService.deactivate,
        );
        this.router.patch(
            `${this.path}/changeResponsible`,
            this.academicGroupService.changeResponsible,
        );
        this.router.delete(
            `${this.path}/removeStudent`,
            this.academicGroupService.removeStudent,
        );
        this.router.patch(
            `${this.path}/removeStudent`,
            this.academicGroupService.removeStudent,
        );
    }
}
