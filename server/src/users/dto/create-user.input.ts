import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  IsPositive,
  Min,
  Max,
  IsMobilePhone,
} from 'class-validator';


@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  // @IsString()
  @IsMobilePhone('nl-BE')
  @Field()
  gsm: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
