import { AcademicGroupRepository } from '../academic-groups/academic-group-repository';
import { NotFoundException } from '../errors/not-found';
import { StudentRepository } from '../students/student-repository';
import { EventRepository } from './event-repository';

const eventRepository = new EventRepository();
const academicGroupRepository = new AcademicGroupRepository();
const studentRepository = new StudentRepository();

export class EventService {
    async create(
        name: string,
        startDate: string,
        endDate: string,
        organizersIds: string[],
        addressId: string,
        guestsIds: string[],
        academicGroupsOrganizersIds: string[],
        academicGroupsGuestsIds: string[],
    ) {
        for (let i = 0; i < academicGroupsOrganizersIds.length; i++) {
            const academicGroup = await academicGroupRepository.findById(
                academicGroupsOrganizersIds[i],
            );

            if (!academicGroup) {
                throw new NotFoundException('Academic Group not found :(');
            }
        }

        for (let i = 0; i < organizersIds.length; i++) {
            const studentOrganizers = await studentRepository.findById(
                organizersIds[i],
            );

            if (!studentOrganizers) {
                throw new NotFoundException('Student not found :(');
            }
        }

        const createdGroup = await eventRepository.create(
            name,
            startDate,
            endDate,
            organizersIds,
            addressId,
            guestsIds,
            academicGroupsOrganizersIds,
            academicGroupsGuestsIds,
        );

        return createdGroup;
    }

    async update(
        event_id: string,
        startDate: string,
        endDate: string,
        addressId: string,
        status: string,
    ) {
        const updatedGroup = await eventRepository.update(
            event_id,
            startDate,
            endDate,
            addressId,
            status,
        );

        return updatedGroup;
    }
}
