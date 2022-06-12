import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, IsMobilePhone, IsInt, IsPositive, IsPostalCode, IsAlphanumeric, Contains, MaxLength, Min, Max, isString, Matches, matches } from 'class-validator';

@InputType()
export class CreateSubcontractorInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  companyName: string;

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

  @IsString()
  @IsNotEmpty()
  @Field()
  function: string;

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
