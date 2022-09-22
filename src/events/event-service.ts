import { Request, Response } from 'express';
import { AcademicGroupRepository } from '../academic-groups/academic-group-repository';
import { StudentRepository } from '../students/student-repository';
import { EventRepository } from './event-repository';

const eventRepository = new EventRepository();
const academicGroupRepository = new AcademicGroupRepository();
const studentRepository = new StudentRepository();

export class EventService {
    async create(request: Request, response: Response) {
        const {
            name,
            startDate,
            endDate,
            organizersIds,
            addressId,
            guestsIds,
            academicGroupsOrganizersIds,
            academicGroupsGuestsIds,
        } = request.body;

        for (let i = 0; i < academicGroupsOrganizersIds.length; i++) {
            const academicGroup = await academicGroupRepository.findById(
                academicGroupsOrganizersIds[i],
            );

            if (!academicGroup) {
                return response
                    .status(404)
                    .json({ error: 'Academic Group not found :(' });
            }
        }

        for (let i = 0; i < organizersIds.length; i++) {
            const studentOrganizers = await studentRepository.findById(
                organizersIds[i],
            );

            if (!studentOrganizers) {
                return response
                    .status(404)
                    .json({ error: 'Student not found :(' });
            }
        }
        console.log(academicGroupsGuestsIds);

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

        return response.status(201).send(createdGroup);
    }

    async update(request: Request, response: Response) {
        const { event_id, startDate, endDate, addressId, status } =
            request.body;

        const updatedGroup = await eventRepository.update(
            event_id,
            startDate,
            endDate,
            addressId,
            status,
        );

        return response.status(201).send(updatedGroup);
    }
}
