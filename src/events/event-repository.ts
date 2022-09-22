import { EventStatesEnum, PrismaClient } from '@prisma/client';
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

    async update(
        event_id: string,
        startDate: string,
        endDate: string,
        address_id: string,
        status: EventStatesEnum,
    ) {
        const splitedStartDate = startDate?.split('/');
        const splitedEndDate = endDate?.split('/');

        const newData: any = {};

        if (address_id) {
            newData.addressId = address_id;
        }
        if (startDate) {
            newData.startDate = new Date(
                +splitedStartDate[2],
                +splitedStartDate[1] - 1,
                +splitedStartDate[0],
            );
        }
        if (endDate) {
            newData.endDate = new Date(
                +splitedEndDate[2],
                +splitedEndDate[1] - 1,
                +splitedEndDate[0],
            );
        }
        if (status) {
            newData.status = status;
        }

        const updatedEvent = await prismaClient.event.update({
            where: {
                id: event_id,
            },
            data: newData,
        });

        const eventConstructorParams: IEventConstructor = {
            ...updatedEvent,
        };

        const event = new Event({ ...eventConstructorParams });

        return event;
    }
}
