import { EventService } from './event-service';
import { Router } from 'express';

export class EventController {
    private eventService = new EventService();

    public path = '/event';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.post(this.path, this.eventService.create);
        this.router.patch(this.path, this.eventService.update);
    }
}
