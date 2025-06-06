import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await lastValueFrom(
      this.natsClient.send({ cmd: 'getUserById' }, { userId: id }),
    );
    if (!user) throw new HttpException('User not found', 404);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.natsClient.send({ cmd: 'createUser' }, createUserDTO);
  }
}
