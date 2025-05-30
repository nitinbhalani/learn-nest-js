import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfigration: ConfigType<typeof authConfig>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('user unauthorized');
    }

    return this.jwtService
      .verifyAsync(token, this.authConfigration)
      .then(() => true);
  }
}
//hello
