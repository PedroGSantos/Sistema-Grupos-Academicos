import { AcademicGroup } from '../academic-group.entity';
import { IStrategy } from './strategy.interface';

export class Context {
    private strategy!: IStrategy;

    public getStrategy(): IStrategy {
        return this.strategy;
    }

    public setStrategy(value: IStrategy) {
        this.strategy = value;
    }

    constructor(strategy: IStrategy) {
        this.setStrategy(strategy);
    }

    doStrategy(academicGroup: AcademicGroup[]): void {
        this.strategy.print(academicGroup);
    }
}
