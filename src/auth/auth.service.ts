import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const prismaClient = new PrismaClient();

export class AuthService {
    async auth(request: Request, response: Response): Promise<any> {
        const { cpf, password } = request.body;

        const user = await prismaClient.user.findFirst({
            where: {
                cpf: cpf,
            },
            select: {
                id: true,
                cpf: true,
                password: true,
            },
        });

        if (!user) {
            return response.status(404).json({ error: 'User not found :(' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return response
                .status(401)
                .json({ error: 'Password not match :(' });
        }

        const token = sign(
            {
                user_id: user?.id,
                cpf: user?.cpf,
            },
            'valter',
            {
                expiresIn: '24h',
            },
        );

        return response.status(200).json({ token: token });
    }

    async validate(request: Request, response: Response) {
        const token = request.body.token;
        if (!token)
            return response
                .status(401)
                .json({ auth: false, message: 'No token provided.' });

        verify(token, 'valter', (err: any, decoded: any) => {
            if (err) {
                return response.status(401).json({ error: 'Token invalid :(' });
            }
            return response.status(200).json({ user_id: decoded.user_id });
        });
    }
}

export default new AuthService();
