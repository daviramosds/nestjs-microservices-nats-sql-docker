import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersMicroserviceController {
  constructor(private usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDTO) {
    return this.usersService.createUser(data);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(@Payload() { userId }: { userId: string }) {
    return await this.usersService.getUserById(userId);
  }

  @EventPattern('paymentCreated')
  paymentCreated(@Payload() data: any) {
    console.log(data);
  }
}
