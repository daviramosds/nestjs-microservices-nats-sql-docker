import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDTO } from './dto/CreatePayment.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private paymentsService: PaymentsService,
  ) {}

  @EventPattern('createPayment')
  async createPayment(@Payload() createPaymentDTO: CreatePaymentDTO) {
    const newPayment =
      await this.paymentsService.createPayment(createPaymentDTO);
    if (newPayment) this.natsClient.emit('paymentCreated', newPayment);
  }
}
