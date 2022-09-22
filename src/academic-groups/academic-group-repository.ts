import { PrismaClient } from '@prisma/client';
import { DepartmentRepository } from '../departments/department-repository';
import { EventRepository } from '../events/event-repository';
import { ProfessorRepository } from '../professors/professor-repository';
import { StudentRepository } from '../students/student-repository';
import { Student } from '../students/student.entity';
import { IUserConstructor, User } from '../users/user.entity';
import {
    AcademicGroup,
    IAcademicGroupConstructor,
} from './academic-group.entity';
import { ActiveAcademicGroup } from './state/active.entity';
import { InactiveAcademicGroup } from './state/inactive.entity';

const prismaClient = new PrismaClient();
const departmentRepository = new DepartmentRepository();
const studentRepository = new StudentRepository();
const professorRepository = new ProfessorRepository();
const eventRepository = new EventRepository();

export class AcademicGroupRepository {
    buildConstructorParams(academicGroup: any): IAcademicGroupConstructor {
        const constructorParams: IAcademicGroupConstructor = {
            ...academicGroup,
            currentState: academicGroup.currentState
                ? ActiveAcademicGroup.getInstance()
                : InactiveAcademicGroup.getInstance(),
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

        const constructorParams: IAcademicGroupConstructor = {
            ...groupFound,
            currentState: groupFound.currentState
                ? ActiveAcademicGroup.getInstance()
                : InactiveAcademicGroup.getInstance(),
            events: [],
        };

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

    async findByName(name: string): Promise<AcademicGroup[] | undefined> {
        const groupsFound = await prismaClient.academicGroup.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        const constructorsParams: IAcademicGroupConstructor[] = groupsFound.map(
            (groupFound) => {
                return {
                    ...groupFound,
                    currentState: groupFound.currentState
                        ? ActiveAcademicGroup.getInstance()
                        : InactiveAcademicGroup.getInstance(),
                    events: [],
                };
            },
        );

        const academicGroups = constructorsParams.map(
            (constructorParams) => new AcademicGroup({ ...constructorParams }),
        );

        return academicGroups;
    }

    async findParticipantsById(id: string): Promise<any[] | undefined> {
        const participantsFound =
            await prismaClient.academicGroupHasUser.findMany({
                where: {
                    academicGroupId: id,
                },
                select: {
                    user: true,
                    isResponsible: true,
                },
            });

        if (!participantsFound) {
            return;
        }

        return participantsFound;
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

    async save(academicGroup: AcademicGroup) {
        await prismaClient.academicGroup.update({
            where: {
                id: academicGroup.getId(),
            },
            data: {
                responsibleId: academicGroup.getResponsible().getId(),
                currentState: academicGroup.getAcademicGroupState().isActive(),
                academicGroupHasUser: {
                    updateMany: [
                        {
                            where: {
                                userId: academicGroup.getResponsible().getId(),
                            },
                            data: {
                                isResponsible: true,
                            },
                        },
                        {
                            where: {
                                userId: {
                                    not: academicGroup.getResponsible().getId(),
                                },
                            },
                            data: {
                                isResponsible: false,
                            },
                        },
                    ],
                },
            },
        });

        return true;
    }

    async saveStudent(academicGroup: AcademicGroup, student: Student) {
        await prismaClient.academicGroupHasUser.create({
            data: {
                academicGroupId: academicGroup.getId(),
                userId: student.getId(),
                isResponsible: false,
            },
        });

        await prismaClient.academicGroup.update({
            where: {
                id: academicGroup.getId(),
            },
            data: {
                academicGroupHasUser: {
                    updateMany: [
                        {
                            where: {
                                userId: {
                                    not: academicGroup.getResponsible().getId(),
                                },
                            },
                            data: {
                                isResponsible: false,
                            },
                        },
                    ],
                },
            },
        });

        return true;
    }

    async removeStudent(academicGroup: AcademicGroup, student: Student) {
        await prismaClient.academicGroupHasUser.deleteMany({
            where: {
                AND: [
                    { academicGroupId: academicGroup.getId() },
                    { userId: student.getId() },
                ],
            },
        });

        return true;
    }

    async findMany(page = 0) {
        console.log(page);

        const academicGroups = await prismaClient.academicGroup.findMany({
            skip: page - 1 * 5,
            take: 5,
        });

        return academicGroups;
    }
}
