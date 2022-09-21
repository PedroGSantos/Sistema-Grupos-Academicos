import { isUUID } from 'class-validator';
import { Request, Response } from 'express';
import { StudentRepository } from './student-repository';

const studentRepository = new StudentRepository();

export class StudentService {
    async findById(request: Request, response: Response) {
        if (!request?.query?.id || !isUUID(request?.query?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const studentFound = await studentRepository.findById(
            request.query.id as string,
        );

        if (!studentFound) {
            return response.status(404).json({ error: 'Student not found :(' });
        }

        return response.status(200).send(studentFound);
    }

    async findStudentAcademicGroups(request: Request, response: Response) {
        if (!request?.params?.ra) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const studentFound = await studentRepository.findByRa(
            parseInt(request.params.ra),
        );

        if (!studentFound) {
            return response.status(404).json({ error: 'Student not found :(' });
        }

        const academicGroups =
            await studentRepository.findAcademicGroupsByUserId(
                studentFound.getId(),
                true,
            );

        return response
            .status(200)
            .json({ data: academicGroups, count: academicGroups.length });
    }

    async findStudentAcademicGroupsHistory(
        request: Request,
        response: Response,
    ) {
        if (!request?.params?.ra) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const studentFound = await studentRepository.findByRa(
            parseInt(request.params.ra),
        );

        if (!studentFound) {
            return response.status(404).json({ error: 'Student not found :(' });
        }

        const academicGroups =
            await studentRepository.findAcademicGroupsByUserId(
                studentFound.getId(),
            );

        return response
            .status(200)
            .json({ data: academicGroups, count: academicGroups.length });
    }

    async findStudentsInDeactivatedAcademicGroups(
        request: Request,
        response: Response,
    ) {
        const studentsFound =
            await studentRepository.findStudentsInDeactivatedGroups();

        return response.status(200).json(studentsFound);
    }

    async create(request: Request, response: Response) {
        const { name, email, cpf, birthDate, password, department_id } =
            request.body;

        const createdStudent = await studentRepository.create(
            name,
            email,
            cpf,
            birthDate,
            password,
            department_id,
        );

        return response.status(201).send(createdStudent);
    }
}
