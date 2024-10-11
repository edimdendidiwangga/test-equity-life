import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [scheme, credentials] = authHeader.split(' ');

    if (scheme !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const [username, password] = Buffer.from(credentials, 'base64').toString().split(':');

    if (username !== 'user' || password !== 'password') {
      throw new UnauthorizedException('Invalid credentials');
    }

    next();
  }
}
