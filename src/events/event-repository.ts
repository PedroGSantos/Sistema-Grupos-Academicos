import { PrismaClient } from '@prisma/client';
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
}
