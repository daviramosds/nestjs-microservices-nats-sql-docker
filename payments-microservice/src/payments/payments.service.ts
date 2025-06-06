import { Inject, Injectable } from '@nestjs/common';
import { Payment } from 'src/typeorm/entities/Payment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDTO } from './dto/CreatePayment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async createPayment({ userId, ...createPaymentDTO }: CreatePaymentDTO) {
    const user = await lastValueFrom<User>(
      this.natsClient.send({ cmd: 'getUserById' }, { userId }),
    );

    if (!user) return null;

    console.log(user);

    const newPayment = this.paymentsRepository.create({
      ...createPaymentDTO,
      user,
    });

    console.log(newPayment);
    return this.paymentsRepository.save(newPayment);
  }
}
