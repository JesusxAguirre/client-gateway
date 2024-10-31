import { Controller, Get, Post, Body,   Inject, UseGuards,} from '@nestjs/common';

import { NATS_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.user.register', registerUserDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.client.send('auth.user.login', loginAuthDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );;
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: any, @Token() token: string) {
    return this.client.send('auth.user.verify', { user, token });
  }


}
