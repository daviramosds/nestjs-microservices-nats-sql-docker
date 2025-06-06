import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDTO {
  @IsNumber()
  @IsNotEmpty()
  ammount: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
