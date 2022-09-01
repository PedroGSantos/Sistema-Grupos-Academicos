import { PrismaClient } from '@prisma/client';
import { DepartmentRepository } from '../departments/department-repository';
import { EventRepository } from '../events/event-repository';
import { ProfessorRepository } from '../professors/professor-repository';
import { StudentRepository } from '../students/student-repository';
import {
    AcademicGroup,
    IAcademicGroupConstructor,
} from './academic-group.entity';
import { Active } from './state/active.entity';
import { Inactive } from './state/inactive.entity';

const prismaClient = new PrismaClient();
const departmentRepository = new DepartmentRepository();
const studentRepository = new StudentRepository();
const professorRepository = new ProfessorRepository();
const eventRepository = new EventRepository();

export class AcademicGroupRepository {
    buildConstructorParams(academicGroup: any) {
        const constructorParams: IAcademicGroupConstructor = {
            ...academicGroup,
            currentState: academicGroup.currentState
                ? Active.getInstance()
                : Inactive.getInstance(),
        };

        return constructorParams;
    }

    async findById(id: string): Promise<AcademicGroup | undefined> {
        const groupFound = await prismaClient.academicGroup.findUnique({
            where: {
                id: id,
            },
        });

        if (!groupFound) {
            return;
        }

        const constructorParams = this.buildConstructorParams(groupFound);

        const academicGroup = new AcademicGroup({ ...constructorParams });

        await departmentRepository
            .findById(groupFound.departmentId)
            .then((department) => {
                if (department) {
                    academicGroup.setDepartment(department);
                }
            });

        await studentRepository
            .findById(groupFound.responsibleId)
            .then((student) => {
                if (student) {
                    academicGroup.setResponsible(student);
                }
            });

        await professorRepository
            .findById(groupFound.responsibleId)
            .then((professor) => {
                if (professor) {
                    academicGroup.setResponsible(professor);
                }
            });

        await eventRepository
            .findByOrganizerAcademicGroupId(groupFound.id)
            .then((events) => {
                if (events.length) {
                    academicGroup.setEvents(events);
                }
            });

        await eventRepository
            .findByInvitedAcademicGroupId(groupFound.id)
            .then((events) => {
                if (events.length) {
                    academicGroup.setEvents([
                        ...academicGroup.getEvents(),
                        ...events,
                    ]);
                }
            });

        await studentRepository
            .findByAcademicGroupId(groupFound.id)
            .then((students) => {
                if (students) {
                    academicGroup.setParticipants(students);
                }
            });

        return academicGroup;
    }

    async create(
        name: string,
        description: string,
        departmentId: string,
        responsibleId: string,
        participantsLimit: number,
    ) {
        const department = await departmentRepository.findById(departmentId);
        if (!department) {
            return;
        }

        const studentResponsible = await studentRepository.findById(
            responsibleId,
        );
        const professorResponsible = await professorRepository.findById(
            responsibleId,
        );
        if (!studentResponsible && !professorResponsible) {
            return;
        }

        const createdGroup = await prismaClient.academicGroup.create({
            data: {
                name: name,
                description: description,
                departmentId: departmentId,
                responsibleId: responsibleId,
                participantsLimit: participantsLimit,
                academicGroupHasUser: {
                    create: {
                        userId: responsibleId,
                        isResponsible: true,
                    },
                },
            },
        });

        const constructorParams = this.buildConstructorParams(createdGroup);

        const academicGroup = new AcademicGroup({ ...constructorParams });

        return academicGroup;
    }
}
