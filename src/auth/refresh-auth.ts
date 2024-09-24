import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
  constructor(private jwtService: JwtService) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      const resp = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      if (resp) {
        request['user'] = resp;
        return true;
      }
    } catch (error) {}

    return false;
  }
}
