import { Router } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
    private authService = new AuthService();

    public path = '/auth';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.post(this.path, this.authService.auth);
        this.router.post(`${this.path}/validate`, this.authService.validate);
    }
}
