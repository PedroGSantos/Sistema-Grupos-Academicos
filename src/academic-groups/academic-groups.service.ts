import { isUUID } from 'class-validator';
import { Request, Response } from 'express';
import { EventRepository } from '../events/event-repository';
import { ProfessorRepository } from '../professors/professor-repository';
import { StudentRepository } from '../students/student-repository';
import { Student } from '../students/student.entity';
import { subjectsQuantity } from '../utils/getSubjects';
import { AcademicGroupRepository } from './academic-group-repository';

const academicGroupRepository = new AcademicGroupRepository();
const studentRepository = new StudentRepository();
const professorRepository = new ProfessorRepository();
const eventRepository = new EventRepository();

export class AcademicGroupService {
    async findById(request: Request, response: Response) {
        if (!request?.query?.id || !isUUID(request?.query?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }
        console.log(await subjectsQuantity('544895'));
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

        const disabledCode = groupFound.disableAcademicGroup(
            request.body.user_id,
        );
        if (disabledCode == 2) {
            return response.status(400).json({ error: 'Grupo já desativado' });
        } else if (disabledCode == 3) {
            return response.status(403).json({ error: 'Não é o responsável' });
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
        const isStudent = newResponsible instanceof Student;

        if (!newResponsible) {
            return response.status(404).json({ error: 'User not found :(' });
        }

        if (!academicGroup) {
            return response
                .status(404)
                .json({ error: 'Academic Group not found :(' });
        }

        const changedCode = academicGroup.changeResponsable(
            request.body.user_id,
            newResponsible,
        );
        if (changedCode == 2) {
            return response.status(400).json({ error: 'Grupo já desativado' });
        } else if (changedCode == 3) {
            return response.status(403).json({ error: 'Não é o responsável' });
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

        if (
            !academicGroup.addStudent(
                student,
                await subjectsQuantity(String(student.getRA())),
            )
        )
            return response.status(400).json({ error: 'Student has issues' });

        await academicGroupRepository.saveStudent(academicGroup, student);
        return response.status(204).send();
    }

    async removeStudent(request: Request, response: Response) {
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
        console.log(studentId);
        console.log(student);

        if (!student) {
            return response.status(404).json({ error: 'Student not found :(' });
        }

        const removedCode = academicGroup.removeStudent(
            request.body.user_id,
            student,
        );
        if (removedCode == 2) {
            return response.status(400).json({ error: 'Student has issues' });
        } else if (removedCode == 3) {
            return response.status(403).json({ error: 'Não é o responsável' });
        }

        await academicGroupRepository.removeStudent(academicGroup, student);
        return response.status(204).send();
    }

    async findInvitedEventsById(request: Request, response: Response) {
        if (!request?.query?.id || !isUUID(request?.query?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const events = await eventRepository.findByInvitedAcademicGroupId(
            request.query.id as string,
        );

        return response.status(200).send(events);
    }

    async findMany(request: Request, response: Response) {
        if (!request?.query?.name) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const groupsFound = await academicGroupRepository.findByName(
            request.query.name as string,
        );

        return response.status(200).send(groupsFound);
    }
}
