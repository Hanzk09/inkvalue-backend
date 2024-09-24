import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    Logger.log(
      context.switchToHttp().getRequest().path,
      context.switchToHttp().getRequest().method,
    );
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        message: 'Sucesso.',
        data,
      })),
    );
  }
}
