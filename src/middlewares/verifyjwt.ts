import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function verifyJWT(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const token = request.headers.token?.toString();
    if (!token)
        return response
            .status(401)
            .json({ auth: false, message: 'No token provided.' });

    verify(token, process.env.SECRET || 'sct', (err: any, decoded: any) => {
        if (err) {
            return response.status(403).json({ error: 'Forbidden :(' });
        }
        request.body.user_id = decoded.user_id;
        next();
    });
}
