import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilterUser {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  take: number;
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  skip: number;
}
