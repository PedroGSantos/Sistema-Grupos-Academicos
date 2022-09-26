import { isUUID } from 'class-validator';
import { BadGatewayException } from '../errors/bad-gateway';
import { BadRequestException } from '../errors/bad-request';
import { ForbiddenException } from '../errors/forbidden';
import { NotFoundException } from '../errors/not-found';
import { EventRepository } from '../events/event-repository';
import { Student } from '../students/student.entity';
import { subjectsQuantity } from '../utils/getSubjects';
import { StudentRepository } from '../students/student-repository';
import { ProfessorRepository } from '../professors/professor-repository';
import { AcademicGroupRepository } from './academic-group-repository';
import { libraryPendenciesQuantity } from '../utils/getPendencies';

const academicGroupRepository = new AcademicGroupRepository();
const studentRepository = new StudentRepository();
const professorRepository = new ProfessorRepository();
const eventRepository = new EventRepository();

export class AcademicGroupService {
    async findById(id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Invalid id :(');
        }
        console.log(await subjectsQuantity('544895'));
        const groupFound = await academicGroupRepository.findById(id);

        if (!groupFound) {
            throw new NotFoundException('Academic Group not found :(');
        }

        return groupFound;
    }

    async create(
        name: string,
        description: string,
        departmentId: string,
        responsibleId: string,
        participantsLimit: number,
    ) {
        const createdGroup = await academicGroupRepository.create(
            name,
            description,
            departmentId,
            responsibleId,
            participantsLimit,
        );

        if (!createdGroup) {
            throw new BadGatewayException('Unmapped error occured :(');
        }

        return createdGroup;
    }

    async deactivate(id: string, logged_id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Invalid id :(');
        }

        const groupFound = await academicGroupRepository.findById(id as string);

        if (!groupFound) {
            throw new NotFoundException('Academic Group not found :(');
        }

        const disabledCode = groupFound.disableAcademicGroup(logged_id);

        if (disabledCode == 2) {
            throw new BadRequestException('Grupo já desativado');
        } else if (disabledCode == 3) {
            throw new ForbiddenException('Não é o responsável');
        }

        await academicGroupRepository.save(groupFound);

        return true;
    }

    async changeResponsible(
        academicGroupId: string,
        newResponsibleId: string,
        logged_id: string,
    ) {
        const academicGroup = await academicGroupRepository.findById(
            academicGroupId,
        );

        const student = await studentRepository.findById(newResponsibleId);

        const professor = await professorRepository.findById(newResponsibleId);

        const newResponsible = student ?? professor;
        const isStudent = newResponsible instanceof Student;

        if (!newResponsible) {
            throw new NotFoundException('User not found :(');
        }

        if (!academicGroup) {
            throw new NotFoundException('Academic Group not found :(');
        }

        let changedCode = 1;
        if (isStudent) {
            changedCode = academicGroup.changeResponsable(
                logged_id,
                newResponsible,
                await subjectsQuantity(String(student?.getRA())),
            );
        } else {
            changedCode = academicGroup.changeResponsable(
                logged_id,
                newResponsible,
            );
        }

        if (changedCode == 2) {
            throw new BadRequestException('Grupo já desativado');
        } else if (changedCode == 3) {
            throw new ForbiddenException('Não é o responsável');
        } else if (changedCode == 4) {
            throw new ForbiddenException('Não está inscrito em disciplinas');
        }

        await academicGroupRepository.save(academicGroup);

        return true;
    }

    async addStudent(academicGroupId: string, studentId: string) {
        const academicGroup = await academicGroupRepository.findById(
            academicGroupId,
        );

        if (!academicGroup) {
            throw new NotFoundException('Academic Group not found :(');
        }

        const student = await studentRepository.findById(studentId);

        if (!student) {
            throw new NotFoundException('Student not found :(');
        }

        student.setLibraryPendencies(
            (await libraryPendenciesQuantity(String(student.getCPF()))) > 0
                ? false
                : true,
        );

        if (
            !academicGroup.addStudent(
                student,
                await subjectsQuantity(String(student.getRA())),
            )
        )
            throw new BadRequestException('Student has issues');

        await academicGroupRepository.saveStudent(academicGroup, student);

        return true;
    }

    async removeStudent(
        academicGroupId: string,
        studentId: string,
        logged_id: string,
    ) {
        const academicGroup = await academicGroupRepository.findById(
            academicGroupId,
        );

        if (!academicGroup) {
            throw new NotFoundException('Academic Group not found :(');
        }

        const student = await studentRepository.findById(studentId);

        if (!student) {
            throw new NotFoundException('Student not found :(');
        }

        const removedCode = academicGroup.removeStudent(logged_id, student);

        if (removedCode == 2) {
            throw new BadRequestException('Grupo está desativado');
        } else if (removedCode == 3) {
            throw new ForbiddenException('Não é o responsável');
        }

        await academicGroupRepository.removeStudent(academicGroup, student);

        return true;
    }

    async findInvitedEventsById(id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const events = await eventRepository.findByInvitedAcademicGroupId(id);

        return events;
    }

    async findManyByName(name: string) {
        if (!name) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const groupsFound = await academicGroupRepository.findByName(name);

        return groupsFound;
    }

    async findParticipantsById(academicGroupId: string) {
        if (!academicGroupId || !isUUID(academicGroupId)) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const academicGroup = await academicGroupRepository.findById(
            academicGroupId,
        );

        if (!academicGroup) {
            throw new NotFoundException('Academic Group not found :(');
        }

        const participants = await academicGroupRepository.findParticipantsById(
            academicGroupId,
        );

        return participants;
    }

    async findOrganizedEventsById(id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const events = await eventRepository.findByOrganizerAcademicGroupId(id);

        return events;
    }

    async findParticipantsWithSubjects(id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const academicGroup = await academicGroupRepository.findById(id);

        if (!academicGroup) {
            throw new NotFoundException('Academic Group not found :(');
        }

        if (!academicGroup.getAcademicGroupState().isActive()) {
            throw new BadRequestException('Academic Group is not active :(');
        }

        const participants = [];

        for (let i = 0; i < academicGroup.getParticipants().length; i++) {
            const student = await studentRepository.findById(
                academicGroup.getParticipants()[i].getId(),
            );

            const subjectsNumber = await subjectsQuantity(
                String(student?.getRA()),
            );

            if (subjectsNumber >= 2) {
                participants.push(academicGroup.getParticipants()[i]);
            }
        }

        return participants;
    }

    async findParticipantsWithPendencies(id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const academicGroup = await academicGroupRepository.findById(id);

        if (!academicGroup) {
            throw new NotFoundException('Academic Group not found :(');
        }

        if (!academicGroup.getAcademicGroupState().isActive()) {
            throw new BadRequestException('Academic Group is not active :(');
        }

        const participants = [];

        for (let i = 0; i < academicGroup.getParticipants().length; i++) {
            const student = await studentRepository.findById(
                academicGroup.getParticipants()[i].getId(),
            );

            const libraryPendencies = await libraryPendenciesQuantity(
                String(student?.getCPF()),
            );

            if (libraryPendencies >= 2) {
                participants.push(academicGroup.getParticipants()[i]);
            }
        }

        return participants;
    }

    async findMany(page = '1') {
        const groupsFound = await academicGroupRepository.findMany(
            parseInt(page),
        );

        return groupsFound;
    }
}
