import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
  ParseEnumPipe,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { StatusDto } from './dto/status-order.dto';
import { ORDER_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/core';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('create_order', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('find_all_orders', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('find_one_order', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  changeStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeStatusOrderDto: StatusDto,
  ) {
    console.log(changeStatusOrderDto);
    {
    }
    return this.ordersClient
      .send('change_status_order', {
        id,
        ...changeStatusOrderDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
