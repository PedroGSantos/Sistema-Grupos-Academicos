import { EventService } from './event-service';
import { Request, Response, Router } from 'express';
import { handleError } from '../errors/handle-error';

const eventService = new EventService();

export class EventController {
    public path = '/event';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async create(request: Request, response: Response) {
        return await eventService
            .create(
                request.query.name as string,
                request.query.startDate as string,
                request.query.endDate as string,
                request.query.organizersIds as string[],
                request.query.addressId as string,
                request.query.guestsIds as string[],
                request.query.academicGroupsOrganizersIds as string[],
                request.query.academicGroupsGuestsIds as string[],
            )
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    async update(request: Request, response: Response) {
        return await eventService
            .update(
                request.query.event_id as string,
                request.query.startDate as string,
                request.query.endDate as string,
                request.query.addressId as string,
                request.query.status as string,
            )
            .then((groupFound) => response.status(200).send(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.post(this.path, this.create);
        this.router.patch(this.path, this.update);
    }
}
