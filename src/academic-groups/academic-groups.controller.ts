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
    }
}
