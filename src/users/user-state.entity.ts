import { User } from "./user.entity";

export abstract class UserState {
    abstract changeEnrollment(user:User): void;
}