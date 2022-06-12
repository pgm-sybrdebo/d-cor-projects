import { InputType, Int, Field } from '@nestjs/graphql';
import { Contains, contains, IsAlphanumeric, IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsOptional, IsPositive, IsPostalCode, IsString, Matches, Max, MaxLength, Min } from 'class-validator';

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

  @IsInt()
  @Min(0)
  @Max(1)
  @IsNotEmpty()
  @Field(type => Int)
  gender: number;


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

  @IsOptional()
  @IsAlphanumeric()
  @Matches('(BE)?0[0-9]{9}')
  @MaxLength(12)
  @Field()
  vatNumber: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Matches('(BE)[0-9]{14}')
  @MaxLength(16)
  @Field()
  accountNumber: string;
}
