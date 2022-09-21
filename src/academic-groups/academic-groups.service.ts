import { isUUID } from 'class-validator';
import { Request, Response } from 'express';
import { ProfessorRepository } from '../professors/professor-repository';
import { StudentRepository } from '../students/student-repository';
import { AcademicGroupRepository } from './academic-group-repository';

const academicGroupRepository = new AcademicGroupRepository();
const studentRepository = new StudentRepository();
const professorRepository = new ProfessorRepository();

export class AcademicGroupService {
    async findById(request: Request, response: Response) {
        if (!request?.query?.id || !isUUID(request?.query?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const groupFound = await academicGroupRepository.findById(
            request.query.id as string,
        );

        if (!groupFound) {
            return response
                .status(404)
                .json({ error: 'Academic Group not found :(' });
        }

        return response.status(200).send(groupFound);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            description,
            departmentId,
            responsibleId,
            participantsLimit,
        } = request.body;

        const createdGroup = await academicGroupRepository.create(
            name,
            description,
            departmentId,
            responsibleId,
            participantsLimit,
        );

        return response.status(201).send(createdGroup);
    }

    async deactivate(request: Request, response: Response) {
        if (!request?.body?.id || !isUUID(request?.body?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const groupFound = await academicGroupRepository.findById(
            request.body.id as string,
        );

        if (!groupFound) {
            return response
                .status(404)
                .json({ error: 'Academic Group not found :(' });
        }

        if (!groupFound.disableAcademicGroup()) {
            return response.status(400).json({ error: 'Grupo já desativado' });
        }

        await academicGroupRepository.save(groupFound);

        return response.status(204).send();
    }

    async changeResponsible(request: Request, response: Response) {
        const { academicGroupId, newResponsibleId } = request.body;

        const academicGroup = await academicGroupRepository.findById(
            academicGroupId,
        );

        const student = await studentRepository.findById(newResponsibleId);

        const professor = await professorRepository.findById(newResponsibleId);

        const newResponsible = student ?? professor;
        if (!newResponsible) {
            return response.status(404).json({ error: 'User not found :(' });
        }

        if (!academicGroup) {
            return response
                .status(404)
                .json({ error: 'Academic Group not found :(' });
        }

        if (!academicGroup.changeResponsable(newResponsible)) {
            return response.status(400).json({ error: 'Grupo Desativado' });
        }

        await academicGroupRepository.save(academicGroup);

        return response.status(204).send();
    }

    async addStudent(request: Request, response: Response) {
        const { academicGroupId, studentId } = request.body;

        const academicGroup = await academicGroupRepository.findById(
            academicGroupId,
        );

        if (!academicGroup) {
            return response
                .status(404)
                .json({ error: 'Academic Group not found :(' });
        }

        const student = await studentRepository.findById(studentId);

        if (!student) {
            return response.status(404).json({ error: 'Student not found :(' });
        }

        if (!academicGroup.addStudent(student, 3))
            return response.status(400).json({ error: 'Student has issues' });

        await academicGroupRepository.save(academicGroup);
        return response.status(204).send();
    }
}
