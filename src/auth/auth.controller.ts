import { Request, Response, Router } from 'express';
import { handleError } from '../errors/handle-error';
import { AuthService } from './auth.service';

export class AuthController {
    private authService = new AuthService();

    public path = '/auth';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async auth(request: Request, response: Response) {
        return await this.authService
            .auth(request.body.cpf, request.body.password)
            .then((token) => response.status(200).json({ token: token }))
            .catch((error) => handleError(response, error));
    }

    async validate(request: Request, response: Response) {
        return await this.authService
            .validate(request.body.token)
            .then((user_id) => response.status(200).json({ user_id: user_id }))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.post(this.path, this.auth);
        this.router.post(`${this.path}/validate`, this.validate);
    }
}
