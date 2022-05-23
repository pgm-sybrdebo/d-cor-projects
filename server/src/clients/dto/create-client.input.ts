import { InputType, Int, Field } from '@nestjs/graphql';
import { Contains, contains, IsAlphanumeric, IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsPositive, IsPostalCode, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateClientInput {

  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsMobilePhone('nl-BE')
  @IsNotEmpty()
  @Field()
  gsm: string;

  @IsNotEmpty()
  @Field()
  street: string

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(type => Int)
  houseNumber: number;

  @IsNotEmpty()
  @IsPostalCode('BE')
  @Field()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  country: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Contains('BE')
  // @Contains('‹ ^(BE)?0[0-9]{9}$ ›')
  @MaxLength(12)
  @Field()
  vatNumber: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Contains('BE')
  @MaxLength(16)
  @Field()
  accountNumber: string;
}
