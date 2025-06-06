import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './typeorm/entities/Payment';
import { User } from './typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      database: 'nestjs_db',
      entities: [Payment, User],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    PaymentsModule,
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
