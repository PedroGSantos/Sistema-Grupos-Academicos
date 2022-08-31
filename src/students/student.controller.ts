import { StudentService } from './student.service';
import { Router } from 'express';

export class StudentController {
    private studentService = new StudentService();

    public path = '/students';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.get(this.path, this.studentService.findById);
        this.router.get(
            `${this.path}/deactivatedGroups`,
            this.studentService.findStudentsInDeactivatedAcademicGroups,
        );
        this.router.get(
            `${this.path}/:ra`,
            this.studentService.findStudentAcademicGroups,
        );
        this.router.get(
            `${this.path}/:ra/history`,
            this.studentService.findStudentAcademicGroupsHistory,
        );
    }
}
