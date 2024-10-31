import { Controller, Get, Post, Body,   Inject,} from '@nestjs/common';

import { CreateAuthDto } from './dto/create-auth.dto';
import { NATS_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.client.send('createAuth', createAuthDto);
  }


}
