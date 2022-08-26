import { Event } from '../event.entity';
import { Cancelled } from './cancelled.entity';

export abstract class EventState {
    abstract checkDate(Event: Event): void;
    cancelEvent(Event: Event): void {
        Event.setCurrentState(Cancelled.getInstance());
    }
}
