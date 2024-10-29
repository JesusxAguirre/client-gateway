import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class OrderItemDto {
  @IsUUID(4)
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
