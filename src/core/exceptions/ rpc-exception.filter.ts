import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'message' in rpcError &&
      'status' in rpcError &&
      typeof rpcError.status === 'number' &&
      typeof rpcError.message === 'string'
    ) {
      response.status(rpcError.status).json(rpcError);

      return;
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
