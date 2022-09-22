import { PrismaClient } from '@prisma/client';
import { AcademicGroupRepository } from '../academic-groups/academic-group-repository';
import { Localization } from '../localizations/localization.entity';
import { StudentRepository } from '../students/student-repository';
import { Event, IEventConstructor } from './event.entity';

const prismaClient = new PrismaClient();

export class EventRepository {
    async findById(id: string): Promise<Event | undefined> {
        const eventFound = await prismaClient.event.findFirst({
            where: {
                id: id,
            },
        });

        if (!eventFound) {
            return;
        }

        const eventConstructorParams: IEventConstructor = {
            ...eventFound,
        };

        const event = new Event({ ...eventConstructorParams });

        return event;
    }

    async findByOrganizerAcademicGroupId(
        academicGroupId: string,
    ): Promise<Event[]> {
        const eventsFound = await prismaClient.event.findMany({
            where: {
                organizersGroups: {
                    some: {
                        academicGroupId: academicGroupId,
                    },
                },
            },
        });

        if (!eventsFound) {
            return [];
        }

        const eventsConstructorParams: IEventConstructor[] = eventsFound.map(
            (eventFound) => {
                return { ...eventFound };
            },
        );

        const events = eventsConstructorParams.map(
            (eventConstructorParams) =>
                new Event({ ...eventConstructorParams }),
        );

        return events;
    }

    async findByInvitedAcademicGroupId(
        academicGroupId: string,
    ): Promise<Event[]> {
        const eventsFound = await prismaClient.event.findMany({
            where: {
                invitedAcademicGroups: {
                    some: {
                        academicGroupId: academicGroupId,
                    },
                },
            },
        });

        if (!eventsFound) {
            return [];
        }

        const eventsConstructorParams: IEventConstructor[] = eventsFound.map(
            (eventFound) => {
                return { ...eventFound };
            },
        );

        const events = eventsConstructorParams.map(
            (eventConstructorParams) =>
                new Event({ ...eventConstructorParams }),
        );

        return events;
    }

    async create(
        name: string,
        startDate: Date,
        endDate: Date,
        organizersIds: [],
        local: string,
        guestsIds: [],
        academicGroupsOrganizersId: [],
        academicGroupsGuestsId: [],
    ) {
        const usersObject = organizersIds.map((userId: string) => {
            return { userId: userId };
        });

        const usersGuestsObject = guestsIds.map((userId: string) => {
            return { userId: userId };
        });

        const academicGroupOrganizersObject = academicGroupsOrganizersId.map(
            (academicGroupId: string) => {
                return { academicGroupId: academicGroupId };
            },
        );

        const academicGroupsGuestsObject = academicGroupsGuestsId.map(
            (academicGroupId: string) => {
                return { academicGroupId: academicGroupId };
            },
        );

        const createdEvent = await prismaClient.event.create({
            data: {
                name: name,
                startDate: new Date(),
                endDate: new Date(),
                status: 'scheduled',
                addressId: local,
                organizersUsers: {
                    createMany: {
                        data: usersObject,
                    },
                },
                organizersGroups: {
                    createMany: {
                        data: academicGroupOrganizersObject,
                    },
                },
                invitedAcademicGroups: {
                    createMany: {
                        data: academicGroupsGuestsObject,
                    },
                },
                guests: {
                    createMany: {
                        data: usersGuestsObject,
                    },
                },
            },
        });
    }
}
