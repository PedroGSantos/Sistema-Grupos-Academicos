export class ForbiddenException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
