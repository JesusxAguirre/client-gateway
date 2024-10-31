import { Controller, Get, Post, Body,   Inject,} from '@nestjs/common';

import { CreateAuthDto } from './dto/create-auth.dto';
import { NATS_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.user.register', registerUserDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.client.send('auth.user.login', loginAuthDto);
  }

  @Get('verify')
  verify() {
    return this.client.send('auth.user.verify', { });
  }


}
