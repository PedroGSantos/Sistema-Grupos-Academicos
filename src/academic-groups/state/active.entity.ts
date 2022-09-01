import { AcademicGroup } from '../academic-group.entity';
import { AcademicGroupState } from './academic-group-state.entity';
import { InactiveAcademicGroup } from './inactive.entity';

export class ActiveAcademicGroup extends AcademicGroupState {
    private static activeUniqueInstance: AcademicGroupState;

    private constructor() {
        super();
    }

    public static getInstance(): AcademicGroupState {
        if (!ActiveAcademicGroup.activeUniqueInstance) {
            this.activeUniqueInstance = new ActiveAcademicGroup();
        }
        return this.activeUniqueInstance;
    }

    public modifyStatusGroup(academicGroup: AcademicGroup): void {
        academicGroup.setAcademicGroupState(
            InactiveAcademicGroup.getInstance(),
        );
    }

    public isActive(): boolean {
        return true;
    }
}
