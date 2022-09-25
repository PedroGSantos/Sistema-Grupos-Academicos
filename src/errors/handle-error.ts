import { Response } from 'express';
import { BadGatewayException } from './bad-gateway';
import { BadRequestException } from './bad-request';
import { ForbiddenException } from './forbidden';
import { NotFoundException } from './not-found';
import { UnauthorizedException } from './unauthorized';

export function handleError(response: Response, error: Error) {
    if (error instanceof BadRequestException) {
        return response.status(400).json({ error: error.message });
    } else if (error instanceof UnauthorizedException) {
        return response.status(401).json({ error: error.message });
    } else if (error instanceof ForbiddenException) {
        return response.status(403).json({ error: error.message });
    } else if (error instanceof NotFoundException) {
        return response.status(404).json({ error: error.message });
    } else if (error instanceof BadGatewayException) {
        return response.status(502).json({ error: error.message });
    }
}
