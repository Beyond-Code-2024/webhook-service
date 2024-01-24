import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: Function) {
    const auth = req.headers['authorization'];
    if (!auth) {
      return res.status(401).json({
        message: 'Missing Credentials',
      });
    }
    const jwtToken = auth.split('Bearer ');
    next();
  }
}
