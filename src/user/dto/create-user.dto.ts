import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthdate: Date;
}
