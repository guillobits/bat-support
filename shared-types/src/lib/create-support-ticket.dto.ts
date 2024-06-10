import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsEnum, IsNumber, IsNotEmpty, IsString, Length, IsBoolean, IsEmail } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class AnswerDto {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsNumber()
  @IsNotEmpty()
  answerId: number;
}


export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @Length(5, 5)
  zipcode: string;

  @IsBoolean()
  marketingOptin: boolean;
}


export class CreateSupportTicketDto {
  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
