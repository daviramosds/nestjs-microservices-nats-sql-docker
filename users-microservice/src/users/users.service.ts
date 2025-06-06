import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepostiry: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const newUser = this.usersRepostiry.create(createUserDTO);
    return this.usersRepostiry.save(newUser);
  }

  async getUserById(id: string) {
    return await this.usersRepostiry.findOne({
      where: { id },
      relations: ['payments'],
    });
  }
}
