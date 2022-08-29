import { AcademicGroup } from '../academic-group.entity';
import { AcademicGroupState } from './academic-group-state.entity';
import { Active } from './active.entity';

export class Inactive extends AcademicGroupState {
    private static inactiveUniqueInstance: AcademicGroupState;

    private constructor() {
        super();
    }

    public static getInstance(): AcademicGroupState {
        if (!Inactive.inactiveUniqueInstance) {
            this.inactiveUniqueInstance = new Inactive();
        }
        return this.inactiveUniqueInstance;
    }

    public modifyStatusGroup(academicGroup: AcademicGroup): void {
        academicGroup.setAcademicGroupState(Active.getInstance());
    }

    public isActive(): boolean {
        return false;
    }
}
