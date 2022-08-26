import { Event } from '../event.entity';
import { EventState } from './eventState.entity';
import { Finished } from './finished.entity';

export class Happening extends EventState {
    public checkDate(Event: Event): void {
        Event.setCurrentState(new Finished());
    }
}
