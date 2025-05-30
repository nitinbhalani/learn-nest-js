import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfigration: ConfigType<typeof authConfig>,
    private readonly reflactor: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: unknown = this.reflactor.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(isPublic);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('user unauthorized');
    }
    try {
      const payload: unknown = await this.jwtService.verifyAsync(
        token,
        this.authConfigration,
      );
      request['user'] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }
}
//hello
