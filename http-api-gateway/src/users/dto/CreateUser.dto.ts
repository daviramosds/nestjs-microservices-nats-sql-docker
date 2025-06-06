import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  username: string;

  @IsOptional()
  @IsString()
  displayName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
