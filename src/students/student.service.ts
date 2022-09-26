import { isUUID } from 'class-validator';
import { NotFoundException } from '../errors/not-found';
import { StudentRepository } from './student-repository';

const studentRepository = new StudentRepository();

export class StudentService {
    async findById(id: string) {
        if (!id || !isUUID(id)) {
            throw new NotFoundException('Requisição mal formulada');
        }

        const studentFound = await studentRepository.findById(id);

        if (!studentFound) {
            throw new NotFoundException('Student not found :(');
        }

        return studentFound;
    }

    async findStudentAcademicGroups(ra: number) {
        if (!ra) {
            throw new NotFoundException('Requisição mal formulada');
        }

        const studentFound = await studentRepository.findByRa(ra);

        if (!studentFound) {
            throw new NotFoundException('Student not found :(');
        }

        const academicGroups =
            await studentRepository.findAcademicGroupsByUserId(
                studentFound.getId(),
                true,
            );

        return { data: academicGroups, count: academicGroups.length };
    }

    async findStudentAcademicGroupsHistory(ra: number) {
        if (!ra) {
            throw new NotFoundException('Requisição mal formulada');
        }

        const studentFound = await studentRepository.findByRa(ra);

        if (!studentFound) {
            throw new NotFoundException('Student not found :(');
        }

        const academicGroups =
            await studentRepository.findAcademicGroupsByUserId(
                studentFound.getId(),
            );

        return { data: academicGroups, count: academicGroups.length };
    }

    async findStudentsInDeactivatedAcademicGroups() {
        const studentsFound =
            await studentRepository.findStudentsInDeactivatedGroups();

        return studentsFound;
    }

    async create(
        name: string,
        email: string,
        cpf: string,
        birthDate: string,
        password: string,
        department_id: string,
    ) {
        const createdStudent = await studentRepository.create(
            name,
            email,
            cpf,
            birthDate,
            password,
            department_id,
        );

        return createdStudent;
    }
}
