import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/orders/dto/order.dto';

@Injectable()
export class IsQuantityPositivePipe implements PipeTransform {
  transform(
    value: CreateOrderDto | UpdateOrderDto,
    metadata: ArgumentMetadata,
  ) {
    if (value.quantity <= 0) {
      throw new HttpException(
        'Quantity must be positive',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
