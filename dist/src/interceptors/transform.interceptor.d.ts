import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface IResponseHttp<T> {
    message: '';
    status: string;
    data: T[];
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, IResponseHttp<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseHttp<T>>;
}
